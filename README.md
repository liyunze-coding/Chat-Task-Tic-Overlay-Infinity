# Chat-Task-Tic Widget (Infinity scroll version)

<img src="./images/chat-task-tic-thumbnail_1.1.1.jpg" height="200" alt="Chat-Task-Tic Overlay Preview"/>

---

<!-- directory -->

## Content

-   [Chat-Task-Tic Widget (Infinity scroll version)](#chat-task-tic-widget-infinity-scroll-version)
    -   [Content](#content)
    -   [Commands](#commands)
        -   [Moderators only](#moderators-only)
    -   [Why you should use this](#why-you-should-use-this)
    -   [For Twitch Task Overlay users (my old task list)](#for-twitch-task-overlay-users-my-old-task-list)
    -   [Setup Instructions](#setup-instructions)
    -   [Customization settings](#customization-settings)
        -   [settings](#settings)
        -   [fonts](#fonts)
        -   [scroll](#scroll)
        -   [task list](#task-list)
        -   [header](#header)
        -   [body](#body)
        -   [task (individual tasks)](#task-individual-tasks)
        -   [checkbox](#checkbox)
        -   [bullet point](#bullet-point)
        -   [colon](#colon)
    -   [Aliases](#aliases)
    -   [Credits](#credits)

---

## Commands

-   !task \<task\> - Add a task
-   !done \<task\> - Mark a task as done
-   !remove \<task\> - Remove a task
-   !edit \<task\> - Edit a task
-   !check - Check your last task

### Moderators only

-   !clear - Clear all tasks
-   !cleardone - Clear all done tasks
-   !adel @user - Remove all tasks from a user

For aliases, see [here](https://github.com/liyunze-coding/Chat-Task-Tic-Overlay#aliases)

---

## Why you should use this

-   Free
-   Easy to use
-   Easy to setup
-   Easy to customize
-   No third-party database required

Note: It's only available on Twitch for now

---

## For Twitch Task Overlay users (my old task list)

If you are using my old task list, follow the steps below to migrate to this new version:

Before:

`scripts/index.js`:

```javascript
ComfyJS.Init("YOUR_CHANNEL_HERE", "oauth:OAUTH_TOKEN_HERE");

// or

ComfyJS.Init(
	"YOUR_BOT_ACCOUNT_HERE",
	"oauth:OAUTH_TOKEN_HERE",
	"YOUR_CHANNEL_HERE"
);
```

After:

`auth.js`:

```javascript
const channel = "YOUR_TWITCH_CHANNEL";
const username = "YOUR_BOT_ACCOUNT_HERE";
const oauth = "OAUTH_TOKEN_HERE"; // may or may not include the 'oauth:' part
```

---

## Setup Instructions

Video: https://youtu.be/nX4ib4bxubc

1. Install the Widget

-   Option 1:
    -   Click on the green Code button
    -   Download Zip
    -   Extract zip file
-   Option 2:
    -   `git clone https://github.com/liyunze-coding/chat-task-tic-overlay-infinity.git`

1. Create a Twitch Application

-   https://dev.twitch.tv/console
-   Create a new application
    -   Name (required)
    -   OAuth Redirect URL(s): `http://localhost`
    -   Category: `Chat Bot`
    -   Client Type: `Public`
-   Manage the new application
-   Obtain Client ID

3. Modify details in `auth.js`:

```js
const credentials = {
	clientId: "CLIENT_ID_HERE",
	scopes: "chat:read chat:edit channel:read:redemptions user:read:email",
	channel: ["YOUR STREAMING CHANNELS", "OTHER STREAMING CHANNELS IF NEEDED"], // your main channel
	sender: "YOUR BOT USERNAME / STREAMING CHANNEL", // bot username
};

export default credentials;
```

4. New Browser source

-   Open OBS
-   Add a new Browser Source
-   Checked `Local File`
-   Select the `index.html` file of this project
-   You should see a pop up (modal) that ask you to authorize

5. Authorization

-   Select the browser source and Interact
-   If client ID is missing, refer to step 2-3
-   You should see activation link
-   Copy it and paste it on your browser's URL search bar (Chrome, Firefox, Opera etc.)
-   Click on `Activate`
-   Click on `Authorize`
    -   Authorize using your alt account (acting as a bot) is preferred, otherwise streaming account works fine
    -   Whichever account you authorize with is the account that will send chat messages
-   Interact with browser widget, click on blue button `Click here after authorizing`

---

## Customization settings

Edit `configs.js` to edit the style of the task list

<img src="./images/labels.jpg" height="200" alt="Chat-Task-Tic Overlay Preview"/>

---

### settings

`showDoneTasks`:

**true**: show the done tasks

**false**: hide (and remove) the done tasks

`showTaskNumber`:

**true**: show the task number (completed tasks / total tasks)

**false**: hide the task number

`crossTasksOnDone`:

**true**: cross the tasks when they are marked as done

**false**: don't cross the tasks when they are marked as done

`showCheckBox`:

**true**: show the checkbox

**false**: hide the checkbox, use bullet points instead

---

### fonts

`headerFontFamily` - font family for the header \(supports all fonts from [Google Fonts](https://fonts.google.com/) \)

`bodyFontFamily` - font family for the body \(supports all fonts from [Google Fonts](https://fonts.google.com/)\)

### scroll

`taskListScrollBehaviour` - scroll behaviour for the task list \([supports all css transition-timing-function](https://www.w3schools.com/css/css3_transitions.asp)\), linear and ease-in-out recommended

`pixelsPerSecond` - speed of the scroll in pixels per second (number)

`animationDelay` - delay of the animation in seconds (number)

---

### task list

`taskListWidth` - width of the task list (px)

`taskListHeight` - height of the task list (px)

`taskListBackgroundColor` - background color of the task list (hex only)

`taskListBackgroundOpacity` - background opacity of the task list (0: transparent, 1: opaque, 0.5: half transparent)

`taskListBorderColor` - border color of the task list (hex, name)

`taskListBorderWidth` - border width of the task list (px)

`taskListBorderRadius` - border radius of the task list (px)

---

### header

`headerHeight` - height of the header (px)

`headerBackgroundColor` - background color of the header (hex only)

`headerBackgroundOpacity` - background opacity of the header (0: transparent, 1: opaque, 0.5: half transparent)

`headerBorderColor` - border color of the header (hex, name)

`headerBorderWidth` - border width of the header (px)

`headerBorderRadius` - border radius of the header (px)

`headerFontSize` - font size of the header (px)

`headerFontColor` - font color of the header (hex, name)

`headerPadding` - padding of the header (px)

`tasksNumberFontSize` - font size of the tasks number (px)

---

### body

`bodyBackgroundColor` - background color of the body (hex only)

`bodyBackgroundOpacity` - background opacity of the body (0: transparent, 1: opaque, 0.5: half transparent)

`bodyFontColor` - font color of the body (hex, name)

`bodyBorderColor` - border color of the body (hex, name)

`bodyBorderWidth` - border width of the body (px)

`bodyBorderRadius` - border radius of the body (px)

`bodyVerticalPadding` - vertical padding of the body (px)

`bodyHorizontalPadding` - horizontal padding of the body (px)

---

### task (individual tasks)

`numberOfLines` - number of lines for the task (number)

`usernameColor` - color of the username (hex, name) \(\"\" for twitch username color\)

`taskBackgroundColor` - background color of the task (hex only)

`taskBackgroundOpacity` - background opacity of the task (0: transparent, 1: opaque, 0.5: half transparent)

`taskFontSize` - font size of the task (px)

`taskFontColor` - font color of the task (hex, name)

`taskBorderColor` - border color of the task (hex, name)

`taskBorderWidth` - border width of the task (px)

`taskBorderRadius` - border radius of the task (px)

`taskMarginBottom` - margin bottom of the task (px)

`taskPadding` - padding of the task (px)

---

### checkbox

`checkboxSize` - size of the checkbox (px)

`checkBoxBackgroundColor` - background color of the checkbox (hex only)

`checkBoxBackgroundOpacity` - background opacity of the checkbox (0: transparent, 1: opaque, 0.5: half transparent)

`checkBoxBorderColor` - border color of the checkbox (hex, name)

`checkBoxBorderWidth` - border width of the checkbox (px)

`checkBoxBorderRadius` - border radius of the checkbox (px)

`checkBoxMarginTop` - margin top of the checkbox (px)

`checkBoxMarginLeft` - margin left of the checkbox (px)

`checkBoxMarginRight` - margin right of the checkbox (px)

`tickCharacter` - character for the tick (string)

`tickSize` - font size of the tick (px)

`tickColor` - color of the tick (hex, name)

`tickTranslateY` - translate y of the tick (px) (going upwards)

---

### bullet point

`bulletPointCharacter` - character for the bullet point (string)

`bulletPointSize` - font size of the bullet point (px)

`bulletPointColor` - color of the bullet point (hex, name)

`bulletPointMarginTop` - margin top of the bullet point (px)

`bulletPointMarginLeft` - margin left of the bullet point (px)

`bulletPointMarginRight` - margin right of the bullet point (px)

---

### colon

`colonMarginLeft` - margin left of the colon (px)

`colonMarginRight` - margin right of the colon (px)

---

## Aliases

**add task commands:**

-   `!addtask`
-   `!add`
-   `!task`
-   `!taska`
-   `!taskadd`
-   `!atask`
-   `!todo`

**delete task commands:**

-   `!taskd`
-   `!taskdel`
-   `!taskdelete`
-   `!deltask`
-   `!deletetask`
-   `!taskr`
-   `!taskremove`
-   `!rtask`
-   `!removetask`
-   `!remove`
-   `!delete`

**edit task commands:**

-   `taske`
-   `taskedit`
-   `etask`
-   `edittask`
-   `edit`

**finish task commands:**

-   `!taskf`
-   `!taskfinish`
-   `!ftask`
-   `!finishtask`
-   `!taskdone`
-   `!donetask`
-   `!finish`
-   `!done`
-   `!finished`

**check commands:** \(check last task of yourself or user\)

-   `!taskc`
-   `!taskcheck`
-   `!ctask`
-   `!checktask`
-   `!mytask`
-   `!check`

Note: You can also use it like this: `!check @user` or `!check user`

**help commands:**

-   `!taskh`
-   `!taskhelp`
-   `!htask`
-   `!helptask`
-   `!tasks`

**admin delete commands:** \(delete a task from a user\) \(mods only\)

-   `!taskadel`
-   `!adel`
-   `!adelete`
-   `!admindelete`

**admin clear done commands:** \(clear all done tasks from list\) \(mods only\)

-   `!acleardone`
-   `!admincleardone`
-   `!cleardone`

**admin clear all commands:** \(clear all tasks from list\) \(mods only\)

-   `!clearall`
-   `!allclear`
-   `!adminclearall`
-   `!adminallclear`
-   `!aclearall`
-   `!aclear`
-   `!clear`

---

## Credits

**Author:** [**@RythonDev**](https://twitch.tv/RythonDev)

<!-- contributed -->

**Contributors:**

-   [**@MohFocus**](https://twitch.tv/MohFocus) \(helped with the code\)

**Special thanks to:**

-   [**@Instafluff**](https://twitch.tv/Instafluff) \(for the Comfy JS library\)

**Shoutout to the following streamers for using my task list:** \(if you use my task list, please let me know and I'll add you to this list\)
