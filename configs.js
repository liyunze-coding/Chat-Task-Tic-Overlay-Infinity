const configs = (function () {
	"use strict";

	// settings
	const showDoneTasks = true; // true or false
	const showTasksNumber = true; // true or false
	const crossTasksOnDone = true; // true or false
	const showCheckBox = true; // true or false
	const reverseOrder = false; // true or false

	// TOGGLE TRUE WILL RESET TASKS
	const enableTests = false; // true or false
	// if dummy tasks are still visible, do !clearall to clear all tasks

	// fonts
	const headerFontFamily = "Quicksand"; // supports all google fonts - https://fonts.google.com/
	const bodyFontFamily = "Quicksand"; // supports all google fonts - https://fonts.google.com/

	// scroll
	const pixelsPerSecond = 70; // must be a number

	const gapBetweenScrolls = 100; // integer only

	// task list
	const taskListBackgroundColor = "#F7F8FA"; // hex only
	const taskListBackgroundOpacity = 0; // must be between 0 and 1

	const taskListBorderColor = "101D42"; // hex or name
	const taskListBorderWidth = "0px"; // must have px at the end
	const taskListBorderRadius = "0px"; // must have px at the end

	const taskListPadding = "0px"; // must have px at the end

	// header
	const headerHeight = "60px"; // must have px at the end
	const headerBackgroundColor = "#000"; // hex only
	const headerBackgroundOpacity = 0.9; // must be between 0 and 1

	const headerBorderColor = "white"; // hex or name
	const headerBorderWidth = "2px"; // must have px at the end
	const headerBorderRadius = "10px"; // must have px at the end

	const headerFontSize = "30px"; // must have px at the end
	const headerFontColor = "white"; // hex or name

	const headerPadding = "10px"; // must have px at the end
	const tasksNumberFontSize = "30px"; // must have px at the end

	// body
	const bodyBackgroundColor = "#00ff00"; // hex only
	const bodyBackgroundOpacity = 0; // must be between 0 and 1

	const bodyBorderColor = "white"; // hex or name
	const bodyBorderWidth = "0px"; // must have px at the end
	const bodyBorderRadius = "0px"; // must have px at the end

	const bodyVerticalPadding = "5px"; // must have px at the end
	const bodyHorizontalPadding = "5px"; // must have px at the end

	// task (individual tasks)
	const numberOfLines = 2; // number of lines for the task
	const usernameColor = "white"; // hex or name, "" for twitch username color
	const taskDirection = "row"; // row or column

	const usernameMaxWidth = "100%"; // must have px or % at the end

	const taskBackgroundColor = "#000"; // hex only
	const taskBackgroundOpacity = 0.8; // must be between 0 and 1

	const taskFontSize = "25px"; // must have px at the end
	const taskFontColor = "white"; // hex or name

	const taskBorderColor = "black"; // hex or name
	const taskBorderWidth = "0px"; // must have px at the end
	const taskBorderRadius = "5px"; // must have px at the end

	const taskMarginLeft = "0px"; // must have px at the end
	const taskMarginBottom = "5px"; // must have px at the end
	const taskPadding = "10px"; // must have px at the end

	const taskMaxWidth = "100%"; // must have px or % at the end

	// done task
	const doneTaskBackgroundColor = "#000"; // hex only
	const doneTaskBackgroundOpacity = 0.5; // must be between 0 and 1

	const doneTaskFontColor = "#bbb"; // hex or name

	// checkbox - if enabled
	const checkBoxSize = "20px"; // must have px at the end
	const checkBoxBackgroundColor = "#000"; // hex only
	const checkBoxBackgroundOpacity = 0; // must be between 0 and 1

	const checkBoxBorderColor = "white"; // hex or name
	const checkBoxBorderWidth = "1px"; // must have px at the end
	const checkBoxBorderRadius = "3px"; // must have px at the end

	const checkBoxMarginTop = "6px"; // must have px at the end
	const checkBoxMarginLeft = "2px"; // must have px at the end
	const checkBoxMarginRight = "2px"; // must have px at the end

	const tickCharacter = "'✔'"; // any character, must be in single quotes
	const tickSize = "18px"; // must have px at the end
	const tickColor = "white"; // hex or name
	const tickTranslateY = "4px"; // must have px at the end

	// bullet point - if enabled
	const bulletPointCharacter = "•"; // any character
	const bulletPointSize = "15px"; // must have px at the end
	const bulletPointColor = "white"; // hex or name

	const bulletPointMarginTop = "0px"; // must have px at the end
	const bulletPointMarginLeft = "5px"; // must have px at the end
	const bulletPointMarginRight = "5px"; // must have px at the end

	// colon
	const colonMarginLeft = "0px"; // must have px at the end
	const colonMarginRight = "5px"; // must have px at the end

	// Add task commands - please add commands in the exact format
	const addTaskCommands = [
		"!task",
		"!add",
		"!todo",
		"!taska",
		"!taskadd",
		"!addtask",
		"!atask",
		"!a",
	];

	// Delete task commands - please add commands in the exact format
	const deleteTaskCommands = [
		"!remove",
		"!delete",
		"!taskd",
		"!taskdel",
		"!taskdelete",
		"!deltask",
		"!deletetask",
		"!taskr",
		"!taskremove",
		"!rtask",
		"!removetask",
		"!r",
	];

	// Edit task commands - please add commands in the exact format
	const editTaskCommands = [
		"!edit",
		"!rename",
		"!taskedit",
		"!edittask",
		"!taske",
		"!etask",
		"!e",
	];

	// Finish task commands - please add commands in the exact format
	const finishTaskCommands = [
		"!done",
		"!donetask",
		"!taskdone",
		"!finished",
		"!taskf",
		"!taskfinish",
		"!ftask",
		"!finishtask",
		"!taskd",
		"!dtask",
		"!finish",
		"!f",
	];

	// Next task commands - please add commands in the exact format
	const nextTaskCommands = ["!next", "!nexttask", "!taskn", "!n"];

	// Check task commands - please add commands in the exact format
	const checkCommands = [
		"!mytask",
		"!check",
		"!taskc",
		"!taskcheck",
		"!ctask",
		"!checktask",
		"!c",
	];

	// Help commands - please add commands in the exact format
	const helpCommands = [
		"!taskhelp",
		"!tasks",
		"!taskh",
		"!htask",
		"!helptask",
	];

	// Admin delete - please add commands following the exact format
	const adminDeleteCommands = [
		"!adel",
		"!admindelete",
		"!taskadel",
		"!adelete",
	];

	// Admin clear done - please add commands following the exact format
	const adminClearDoneCommands = [
		"!cleardone",
		"!acleardone",
		"!admincleardone",
	];

	const adminClearAllCommands = [
		"!clearall",
		"!allclear",
		"!adminclearall",
		"!adminallclear",
		"!aclearall",
		"!aclear",
	];

	// Responses
	const taskAdded = 'The task "{task}" has been added, {user}!';
	const noTaskAdded =
		"Looks like you already have a task up there {user}, use !check to check your last task!";
	const noTaskContent = "Try using !add the-task-you-are-working-on {user}";
	const noTaskToEdit = "No task to edit {user}";
	const taskEdited = 'Task edited to "{task}" {user}';
	const taskDeleted = 'Task "{task}" has been deleted, {user}';
	const taskNext =
		"Good job on finishing the task '{oldTask}'! Now moving onto '{newTask}', {user}!";
	const adminDeleteTasks = "All of the user's tasks have been deleted";
	const taskFinished = 'Good job on finishing "{task}" {user}!';
	const taskCheck = '{user} your current task is: "{task}"';
	const taskCheckUser = `{user} {user2}'s current task is: "{task}"`;
	const noTask = "Looks like you don't have a task up there {user}";
	const noTaskA = "Looks like there is no task from that user there {user}";
	const notMod = "Permission denied, {user}; Mods only";
	const clearedAll = "All tasks have been cleared";
	const clearedDone = "All finished tasks have been cleared";
	const nextNoContent = "Try using !next the-task-you-want-to-do-next {user}";
	const help = `{user} Use the following commands to help you out - !task !remove !edit !done. For more commands, click here: https://github.com/liyunze-coding/Chat-Task-Tic-Overlay#commands`;

	const additionalCommands = {
		"!rythondev":
			"{user} Ryan is the creator of this bot, check out his Twitch at https://www.twitch.tv/RythonDev",
	};

	const titles = [
		"!RythonDev",
		"!taskadd",
		"!taskdone",
		"!taskedit",
		"!taskdel",
		"!taskhelp",
	];

	// Other
	const styles = {
		headerFontFamily,
		bodyFontFamily,
		pixelsPerSecond,
		taskListBackgroundColor,
		taskListBackgroundOpacity,
		taskListBorderColor,
		taskListBorderWidth,
		taskListBorderRadius,
		taskListPadding,
		gapBetweenScrolls,
		numberOfLines,
		headerFontColor,
		headerBorderColor,
		headerBorderWidth,
		headerBorderRadius,
		headerHeight,
		headerFontSize,
		headerBackgroundColor,
		headerBackgroundOpacity,
		headerPadding,
		tasksNumberFontSize,
		bodyBorderColor,
		bodyBorderWidth,
		bodyBorderRadius,
		bodyBackgroundColor,
		bodyBackgroundOpacity,
		bodyVerticalPadding,
		bodyHorizontalPadding,
		usernameColor,
		usernameMaxWidth,
		taskFontSize,
		taskFontColor,
		taskBackgroundColor,
		taskBackgroundOpacity,
		taskBorderRadius,
		taskBorderColor,
		taskBorderWidth,
		taskMarginLeft,
		taskMarginBottom,
		taskPadding,
		taskDirection,
		taskMaxWidth,
		doneTaskBackgroundColor,
		doneTaskBackgroundOpacity,
		doneTaskFontColor,
		checkBoxSize,
		checkBoxBorderColor,
		checkBoxBorderRadius,
		checkBoxBorderWidth,
		checkBoxMarginTop,
		checkBoxMarginLeft,
		checkBoxMarginRight,
		checkBoxBackgroundColor,
		checkBoxBackgroundOpacity,
		tickCharacter,
		tickColor,
		tickSize,
		tickTranslateY,
		bulletPointCharacter,
		bulletPointColor,
		bulletPointSize,
		bulletPointMarginRight,
		bulletPointMarginLeft,
		bulletPointMarginTop,
		colonMarginRight,
		colonMarginLeft,
	};

	const commands = {
		addTaskCommands,
		deleteTaskCommands,
		editTaskCommands,
		finishTaskCommands,
		nextTaskCommands,
		helpCommands,
		checkCommands,
		adminDeleteCommands,
		adminClearDoneCommands,
		adminClearAllCommands,
		additionalCommands,
	};

	const responses = {
		taskAdded,
		noTaskAdded,
		noTaskContent,
		taskDeleted,
		taskEdited,
		noTaskToEdit,
		taskFinished,
		taskNext,
		taskCheck,
		taskCheckUser,
		noTask,
		noTaskA,
		notMod,
		help,
		adminDeleteTasks,
		clearedAll,
		clearedDone,
		nextNoContent,
	};

	const settings = {
		enableTests,
		showDoneTasks,
		showTasksNumber,
		crossTasksOnDone,
		showCheckBox,
		reverseOrder,
	};

	let module = {
		styles,
		commands,
		responses,
		settings,
		titles,
	};

	return module;
})();
