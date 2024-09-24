(async (startPage = 0, autoClearConsole = true, minCallTime = 250, maxRetries = 3) => {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const callCacheApi = async (params = {}, retries = 0) => {
    const defaultParams = {
      page: 0,
      maxValuesPerFacet: 1000,
      hitsPerPage: 1000,
      attributesToRetrieve: ["id", "name"].join(",")
    };
    try {
      const response = await fetch("https://proxy-algolia-prod.quixel.com/algolia/cache", {
        headers: {
          "x-api-key": "2Zg8!d2WAHIUW?pCO28cVjfOt9seOWPx@2j"
        },
        body: JSON.stringify({
          url: "https://6UJ1I5A072-2.algolianet.com/1/indexes/assets/query?x-algolia-application-id=6UJ1I5A072&x-algolia-api-key=e93907f4f65fb1d9f813957bdc344892",
          params: new URLSearchParams({ ...defaultParams, ...params }).toString()
        }),
        method: "POST"
      });
      if (response.status === 403) {
        throw new Error(`API request failed with status ${response.status} (Forbidden). Stopping the script.`);
      }
      const data = await response.json();
      if (!response.ok || !data || !data.hits) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      return data;
    } catch (error) {
      if (error.message.includes("status 403")) {
        console.error(error.message);
        throw new Error("Stopping the script due to 403 error.");
      }
      if (retries < maxRetries) {
        console.log(`Retrying API call... (Attempt ${retries + 1})`);
        return callCacheApi(params, retries + 1);
      } else {
        console.error(`API request failed after ${maxRetries} retries:`, error);
        throw error;
      }
    }
  };

  const callAcl = async ({ id, name }, retries = 0) => {
    await new Promise((resolve) => setTimeout(resolve, minCallTime)); // Add delay
    try {
      const response = await fetch("https://quixel.com/v1/acl", {
        headers: {
          authorization: "Bearer " + authToken,
          "content-type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({ assetID: id }),
        method: "POST"
      });
      if (response.status === 403) {
        throw new Error(`API request failed with status ${response.status} (Forbidden). Stopping the script.`);
      }
      const data = await response.json();
      if (!response.ok || data?.isError) {
        if (data?.isError && data?.msg === "Asset already acquired") {
          console.log(`  --> SKIPPED ITEM Item ${id} | ${name} (Asset already acquired)`);
        } else {
          throw new Error(`API request failed with status ${response.status}: ${data?.msg}`);
        }
      } else {
        console.log(`  --> ADDED ITEM Item ${id} | ${name}`);
      }
    } catch (error) {
      if (error.message.includes("status 403")) {
        console.error(error.message);
        throw new Error("Stopping the script due to 403 error.");
      }
      if (retries < maxRetries) {
        console.log(`Retrying API call... (Attempt ${retries + 1})`);
        return callAcl({ id, name }, retries + 1);
      } else {
        console.error(`API request failed after ${maxRetries} retries:`, error);
      }
    }
  };

  const callAcquired = async () => {
    const response = await fetch("https://quixel.com/v1/assets/acquired", {
      headers: {
        authorization: "Bearer " + authToken,
        "content-type": "application/json;charset=UTF-8"
      },
      method: "GET"
    });
    return await response.json();
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs}h ${mins}m ${secs}s`;
  };

  // 1. Check token exist, quixel API needs it
  console.log("-> Checking Auth API Token...");
  let authToken = "";
  try {
    const authCookie = getCookie("auth") ?? "{}";
    authToken = JSON.parse(decodeURIComponent(authCookie))?.token;
    if (!authToken) {
      return console.error("-> Error: cannot find authentication token. Please login again.");
    }
  } catch (_) {
    return console.error("-> Error: cannot find authentication token. Please login again.");
  }

  // 2. Get all currently acquired items
  console.log("-> Get Acquired Items...");
  const acquiredItemsFromApi = (await callAcquired()).map((a) => a.assetID);

  // 3. Get total count of items
  console.log("-> Getting Total Number of Pages....");
  const { nbPages: totalPages, hitsPerPage: itemsPerPage, nbHits: totalItems } = await callCacheApi();

  console.log("-> ==============================================");
  console.log(`-> Total # of items: ${totalItems}`);
  console.log(`-> ${totalPages} total pages with ${itemsPerPage} per page`);
  console.log(`-> Total Items to add: ${totalItems - acquiredItemsFromApi.length}.`);
  console.log("-> ==============================================");

  if (!confirm(`Click OK to start adding ${totalItems - acquiredItemsFromApi.length} items in your account.`)) return;

  let isPaused = false;
  let isCancelled = false;

  const pauseAcquisition = () => {
    isPaused = true;
    console.log('Acquisition process paused. Press "Resume" to continue.');
  };

  const resumeAcquisition = () => {
    isPaused = false;
    console.log("Acquisition process resumed.");
  };

  const cancelAcquisition = () => {
    isCancelled = true;
    console.log("Acquisition process cancelled.");
  };

  let totalTimeSpent = 0;
  let itemsProcessed = 0;

  // Loop through all pages
  for (let pageIdx = startPage; pageIdx < totalPages; pageIdx++) {
    console.log(`-> ======================= PAGE ${pageIdx + 1}/${totalPages} START =======================`);

    console.log("-> Getting Items from page " + (pageIdx + 1) + " ...");

    try {
      const { hits: items } = await callCacheApi({ page: pageIdx });

      console.log("-> Adding non-acquired items...");

      // Filter out owned items
      const unownedItems = items.filter((i) => !acquiredItemsFromApi.includes(i.id));
      for (const item of unownedItems) {
        if (isPaused) {
          await new Promise((resolve) => {
            const intervalId = setInterval(() => {
              if (!isPaused) {
                clearInterval(intervalId);
                resolve();
              }
            }, 1000);
          });
        }

        if (isCancelled) {
          console.log("Acquisition process cancelled.");
          return;
        }

        const startTime = Date.now();
        await callAcl(item); // Call callAcl sequentially with delay
        const endTime = Date.now();

        const timeSpent = endTime - startTime;
        totalTimeSpent += timeSpent;
        itemsProcessed++;

        acquiredItemsFromApi.push(item.id); // Add the acquired item to the list

        const progress = ((acquiredItemsFromApi.length / totalItems) * 100).toFixed(2);
        const remainingItems = totalItems - acquiredItemsFromApi.length;
        const averageTimePerItem = totalTimeSpent / itemsProcessed;
        const estimatedTimeRemaining = ((remainingItems * averageTimePerItem) / 1000).toFixed(2);
        console.log(
          `Progress: ${progress}% | Acquired: ${
            acquiredItemsFromApi.length
          } | Remaining: ${remainingItems} | Estimated Time: ${formatTime(estimatedTimeRemaining)}`
        );
      }
    } catch (error) {
      console.error(`Error processing page ${pageIdx + 1}:`, error);
    }

    console.log(`-> ======================= PAGE ${pageIdx + 1}/${totalPages} COMPLETED =======================`);
    if (autoClearConsole) console.clear(); // Fix the issue that too much log hangs the console. Set autoClearConsole = false to keep the logs
  }

  console.log("-> Getting new acquired info...");
  // Get acquired items again
  const newItemsAcquired = (await callAcquired()).length;
  const newTotalCount = (await callCacheApi()).nbHits;

  console.log(`-> Completed. Your account now have a total of ${newItemsAcquired} out of ${newTotalCount} items.`);

  alert(
    `-> Your account now have a total of ${newItemsAcquired} out of ${newTotalCount} items.\n\nIf you find some items missing, try refresh the page and run the script again.`
  );
})();
