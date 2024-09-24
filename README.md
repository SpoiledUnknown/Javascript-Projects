## Original Creator - [Jamie Phan](https://github.com/jamiephan). I have just modified it a little bit.

## Script to add all items from [quixel](https://quixel.com/)

As quixel is being removed, all items are free to aquire. This script is to automate the process to add items to your account (As of writing, a total of `18874` items)

>Note: This script only tested in the latest version of Chrome.

### How to use

1. Copy the script from below (`run.js`)
2. Login into https://quixel.com
3. Go to https://quixel.com/megascans/collections
4. Open devtools (F12) -> Go to "Console" tab
5. Paste in the script and press <kbd>Enter</kbd>.
6. A dialog should popup confirming the execution, click "OK"
7. Sit back and wait

### Common issues

- Getting "Forbidden" error. (Even after refresh, the whole page just shows "Forbidden")
  - There is a chance that the API adding too fast and you hit the rate limit of the API. (My testing is around after 10 pages, so ~10k items). 
  - Wait after ~10-20 minutes and continue. See `Common Fixes -> Restart script` to continue the execution after you can load https://quixel.com.
- The script seems to be paused/hang
  - It could be too much logging going it. Try monitor the script, if it says "END PAGE X", note the page number down (in case need restart) and clear the console by clicking the "🚫" icon in devtools.
  - See `Common Fixes -> Restart script` for fixing.
- Getting the error `**UNABLE TO ADD ITEM**`
  - There should have the error message shown in `( )`. If it is `user already owns specified asset at a higher or equal resolution`, then its already in your account.
- Getting the error `cannot find authentication token. Please login again`
  - Clear browser cookies and re-login quixel again. Try just simply add 1 item manully. If it success, then see `Common Fixes -> Restart script` for continue the execution.

### Common Fixes

#### Restart Script
1. Note which page it was running
2. Copy the `run.js` script
3. Update the `startPage = 0` on the first line to `startPage = 10` (assuming page 10 was hanged)

## Change Log

1. Initial Script launch
2. Update to clear logs to reduce chance of hanging
3. [CURRENT] Skip adding items that already was acquired. Reduced logs. Added more info after script completion to show purchased item count. Due to now skipping purchased items, you technically don't need to specify the `startPage` anymore.