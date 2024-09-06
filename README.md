## Complete Recent Discord Quest

### Description
A simple js code that allows the user to claim the discord quest completion batch just by pasting and runing the code in dev console in discord app.

### Source Of Origin
> [!NOTE]
> This is not created by me, I have just modified the code a little bit, the original creator is [Aamiaa](https://github.com/aamiaa), and the original page is [here](https://gist.github.com/aamiaa/204cd9d42013ded9faf646fae7f89fbb)

> [!NOTE]
> This no longer works in browser!
> 
> This no longer works if you're alone in vc! Somebody else has to join you!
>

> [!WARNING]
> There are now two quest types ("stream" and "play")! Pay attention to the instructions!
>

How to use this script:
1. Accept a quest under User Settings -> Gift Inventory
2. Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> to open DevTools
3. Go to the `Console` tab
4. Paste the code from `Quest.js` and hit enter:

5. Follow the printed instructions depending on what type of quest you have
    - If your quest says to "play" the game, you can just wait and do nothing
    - If your quest says to "stream" the game, join a vc with a friend or alt and stream any window
7. Wait for 15 minutes
8. You can now claim the reward in User Settings -> Gift Inventory!

You can track the progress by reopening the Gift Inventory tab in settings, or it even shows progress just above the voice chat controls.

## FAQ

**Q: Ctrl + Shift + I doesn't work**

A: Either download the [ptb client](https://discord.com/api/downloads/distributions/app/installers/latest?channel=ptb&platform=win&arch=x64), or use [this](https://www.reddit.com/r/discordapp/comments/sc61n3/comment/hu4fw5x/) to enable DevTools on stable


**Q: I get an error saying "Unauthorized"**

A: Discord has patched the script from working in browsers. Use the desktop app, or alternatively find some extension which lets you change your User-Agent and append the string `Electron/` anywhere in it.

They have also started checking how many people are in the vc, so make sure you join it on at least 1 other account.


**Q: I get a different error**

A: Make sure you're copy/pasting the script correctly and that you've have done all the steps.