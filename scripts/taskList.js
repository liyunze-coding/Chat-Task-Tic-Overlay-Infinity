/*
DB structure:

- usernames
    - username : 
		- current-id

- tasks
    - username-[id]:
		- task
		- done
		- userColor
*/

const responses = configs.responses;
let scrolling = false;
let primaryAnimation, secondaryAnimation;

function loadGoogleFont(font) {
	WebFont.load({
		google: {
			families: [font],
		},
	});
}

// convert taskListBorderColor to task-list-border-color
function convertToCSSVar(name) {
	let cssVar = name.replace(/([A-Z])/g, "-$1").toLowerCase();
	return `--${cssVar}`;
}

// import styles from configs
function importStyles() {
	const styles = configs.styles;

	loadGoogleFont(styles.headerFontFamily);
	loadGoogleFont(styles.bodyFontFamily);

	const stylesToImport = Object.keys(styles).filter((style) => {
		return !style.includes("Background");
	});

	const backgroundStyles = ["taskList", "header", "body", "task", "checkBox"];

	stylesToImport.forEach((style) => {
		document.documentElement.style.setProperty(
			convertToCSSVar(style),
			styles[style]
		);
	});

	// loop through backgroundstyles
	backgroundStyles.forEach((style) => {
		// get background color and opacity
		let backgroundColor = styles[`${style}BackgroundColor`];
		let backgroundOpacity = styles[`${style}BackgroundOpacity`];

		let cssStyle = convertToCSSVar(style);

		// set background color
		document.documentElement.style.setProperty(
			`${cssStyle}-background-color`,
			`rgba(${hexToRgb(backgroundColor)}, ${backgroundOpacity})`
		);
	});

	if (!configs.settings.showTasksNumber) {
		document.getElementById("task-count").style.display = "none";
	}
}

function setupDB() {
	if (!localStorage.usernames_id) {
		localStorage.setItem(`usernames_id`, "{}");
	}
	if (!localStorage.tasks) {
		localStorage.setItem(`tasks`, "{}");
	}
}

function resetDB() {
	localStorage.clear();
	setupDB();
}

function clearAllTasks() {
	resetDB();
	cancelAnimation();
	renderTaskList();
}

function getTasks() {
	return JSON.parse(localStorage.tasks);
}

function saveTasks(tasks) {
	localStorage.setItem(`tasks`, JSON.stringify(tasks));
}

function getID(username) {
	let id = 0;
	let usernames_id = JSON.parse(localStorage.usernames_id);
	if (usernames_id[username]) {
		id = usernames_id[username];
	} else {
		usernames_id[username] = id;
		localStorage.setItem(`usernames_id`, JSON.stringify(usernames_id));
	}

	return id;
}

function incrementID(username, value) {
	let newID = getID(username) + value;
	let usernames_id = JSON.parse(localStorage.usernames_id);
	usernames_id[username] = newID;
	localStorage.setItem(`usernames_id`, JSON.stringify(usernames_id));
}

function renderTaskCount() {
	let tasks = getTasks();

	let totalTasksCount = 0;
	let completedTasksCount = 0;

	for (let task in tasks) {
		let taskData = tasks[task];
		if (taskData.done) {
			completedTasksCount++;
		}
		totalTasksCount++;
	}

	let taskCount = document.getElementById("task-count");
	taskCount.innerText = `${completedTasksCount}/${totalTasksCount}`;
}

function renderTaskList() {
	let tasks = getTasks();

	if (!configs.settings.showDoneTasks) {
		for (let task in tasks) {
			let taskData = tasks[task];
			if (taskData.done) {
				delete tasks[task];
			}
		}
	}

	// reverse the order of tasks
	if (configs.settings.reverseOrder) {
		let reversedTasks = {};
		let tasksKeys = Object.keys(tasks);
		for (let i = tasksKeys.length - 1; i >= 0; i--) {
			let task = tasksKeys[i];
			reversedTasks[task] = tasks[task];
		}
		tasks = reversedTasks;
	}

	let taskContainers = document.querySelectorAll(".task-container");

	taskContainers.forEach(function (taskList) {
		taskList.innerHTML = "";
	});

	for (let task in tasks) {
		let taskData = tasks[task];
		let username = task.split("-")[0];
		let id = task.split("-")[1];

		addTasksToDom(
			username,
			taskData.userColor,
			taskData.task,
			taskData.done
		);
	}

	renderTaskCount();
	animate();
}

// adding task to DOM
function addTasksToDom(username, userColor, task, completed) {
	let taskContainers = document.querySelectorAll(".task-container");

	taskContainers.forEach(function (taskList) {
		let newTask = document.createElement("div");
		let usernameTask = document.createElement("div");

		newTask.className = "task-div";
		usernameTask.className = "username-div";

		if (configs.settings.showCheckBox) {
			// <div class="checkbox"><input type="checkbox" /><label></label></div>
			let checkbox = document.createElement("div");
			checkbox.className = "checkbox";

			let checkboxInput = document.createElement("input");
			checkboxInput.type = "checkbox";

			// if completed is true, check the checkbox
			if (completed) {
				checkboxInput.checked = true;
			}

			checkbox.appendChild(checkboxInput);

			let checkboxLabel = document.createElement("label");
			checkbox.appendChild(checkboxLabel);

			usernameTask.appendChild(checkbox);
		} else {
			let bulletPointDiv = document.createElement("div");

			bulletPointDiv.className = "bullet-point";
			bulletPointDiv.innerText = configs.styles.bulletPointCharacter;

			usernameTask.appendChild(bulletPointDiv);
		}

		// <div class="username">username</div>
		let usernameDiv = document.createElement("div");
		usernameDiv.className = "username";
		usernameDiv.innerText = username;

		if (configs.styles.usernameColor == "") {
			usernameDiv.style.color = userColor;
		}

		usernameTask.appendChild(usernameDiv);

		//  <div class="colon">:</div>
		let colon = document.createElement("div");
		colon.className = "colon";
		colon.innerText = ":";
		usernameTask.appendChild(colon);

		newTask.appendChild(usernameTask);

		// <div class="task">task</div>
		let taskDiv = document.createElement("div");
		taskDiv.className = "task";
		taskDiv.innerText = task;

		if (configs.settings.crossTasksOnDone) {
			if (completed) {
				taskDiv.classList.add("crossed");
			}
		}

		newTask.appendChild(taskDiv);

		// append to task list
		taskList.appendChild(newTask);
	});
}

// return true if pending, else false
function userHasTask(username) {
	let tasks = getTasks();
	let id = getID(username);

	if (tasks[`${username}-${id}`] == null) {
		return false;
	}

	return !tasks[`${username}-${id}`].done;
}

// user adding task
function addTask(username, userColor, task) {
	let tasks = getTasks();
	let id = getID(username);

	tasks[`${username}-${id}`] = {
		userColor: userColor,
		task: task,
		done: false,
	};

	saveTasks(tasks);

	if (!scrolling) {
		renderTaskList();
	}
}

// user completing task
function doneTask(username) {
	let id = getID(username);
	let tasks = getTasks();

	let finishedTask = tasks[`${username}-${id}`].task;

	tasks[`${username}-${id}`].done = true;

	incrementID(username, 1);

	saveTasks(tasks);

	if (!scrolling) {
		renderTaskList();
	}

	return finishedTask;
}

// user removing task
function removeTask(username) {
	let id = getID(username);
	let tasks = getTasks();

	let userTasks = tasks[`${username}-${id}`];
	if (!userTasks) {
		id = id - 1;
		userTasks = tasks[`${username}-${id}`];
		incrementID(username, -1);
	}

	let removedTask = userTasks.task;

	delete tasks[`${username}-${id}`];

	incrementID(username, -1);

	saveTasks(tasks);

	if (!scrolling) {
		renderTaskList();
	}

	return removedTask;
}

// user editing task
function editTask(username, task) {
	let tasks = getTasks();
	let id = getID(username);

	tasks[`${username}-${id}`].task = task;

	saveTasks(tasks);

	if (!scrolling) {
		renderTaskList();
	}
}

// user finish task + add task
function nextTask(username, userColor, task) {
	let finishedTask = doneTask(username);
	addTask(username, userColor, task);

	return finishedTask;
}

// checks user last task
function checkTask(username) {
	// remove @ in username if it exists
	if (username[0] === "@") {
		username = username.slice(1);
	}

	let id = getID(username);
	let tasks = getTasks();

	if (tasks[`${username}-${id}`]) {
		return tasks[`${username}-${id}`].task;
	} else {
		return "";
	}
}

// admin delete all tasks of user
function adminDeleteTask(username) {
	// remove @ in username if it exists
	if (username[0] === "@") {
		username = username.slice(1);
	}

	// allows admin to delete all tasks from username
	let tasks = getTasks();

	// get all tasks that has username as the keys and delete them
	for (let task in tasks) {
		if (task.split("-")[0] === username) {
			delete tasks[task];
		}
	}

	// reset id to 0
	let usernames_id = JSON.parse(localStorage.usernames_id);
	usernames_id[username] = 0;
	localStorage.setItem(`usernames_id`, JSON.stringify(usernames_id));

	saveTasks(tasks);
	renderTaskList();
	cancelAnimation();
}

// delete all completed tasks
function cleardone() {
	let tasks = getTasks();

	for (let task in tasks) {
		if (tasks[task].done) {
			delete tasks[task];
		}
	}

	saveTasks(tasks);
	renderTaskList();
	cancelAnimation();
}

// sleep function
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// scroll up and down
async function animate() {
	// task container height
	let taskContainer = document.querySelector(".task-container");
	let taskContainerHeight = taskContainer.scrollHeight;

	let taskWrapper = document.querySelector(".task-wrapper");
	let taskWrapperHeight = taskWrapper.clientHeight;

	// scroll task wrapper up and down once
	if (taskContainerHeight > taskWrapperHeight && !scrolling) {
		let secondaryElement = document.querySelector(".secondary");
		secondaryElement.style.display = "flex";

		let finalHeight =
			taskContainerHeight + configs.styles.gapBetweenScrolls;
		let duration = (finalHeight / configs.styles.pixelsPerSecond) * 1000;

		// keyframes object in css scroll
		let primaryKeyFrames = [
			{ transform: `translateY(0)` },
			{ transform: `translateY(-${finalHeight}px)` },
		];

		let secondaryKeyFrames = [
			{ transform: `translateY(${finalHeight}px)` },
			{ transform: `translateY(0)` },
		];

		let options = {
			duration: duration,
			iterations: 1,
			easing: "linear",
		};

		// create animation object and play it
		primaryAnimation = document
			.querySelector(".primary")
			.animate(primaryKeyFrames, options);

		secondaryAnimation = document
			.querySelector(".secondary")
			.animate(secondaryKeyFrames, options);

		primaryAnimation.play();
		secondaryAnimation.play();

		// wait for animation to finish
		scrolling = true;

		addAnimationListeners();
	} else if (!scrolling) {
		document.querySelector(".secondary").style.display = "none";

		// cancel animations
		cancelAnimation();
	}
}

function addAnimationListeners() {
	if (primaryAnimation) {
		primaryAnimation.addEventListener("finish", animationFinished);
		primaryAnimation.addEventListener("cancel", animationFinished);
	}
}

function animationFinished() {
	scrolling = false;
	renderTaskList();
	animate();
}

function cancelAnimation() {
	console.log("Animation should be cancelled");
	if (primaryAnimation) {
		primaryAnimation.cancel();
	}
	if (secondaryAnimation) {
		secondaryAnimation.cancel();
	}
	scrolling = false;
}

// tests
function oneLineTasks() {
	for (let i = 1; i <= 10; i++) {
		addTasksToDom(`RyanPython${i}`, "test task", false);
	}
}

async function oneLineDoneTasks() {
	for (let i = 1; i <= 7; i++) {
		addTask(
			`ryans_impostor_${i}`,
			"#fff",
			`test task ${i} never gonna give you up`
		);
		// doneTask(`ryans_impostor`);
		await sleep(1000);
		doneTask(`ryans_impostor_${i}`);
		await sleep(1000);
	}
}

function multiUserLineTasks() {
	let listOfStreamers = [
		`cloudydayzzz`,
		`berryspace`,
		`MohFocus`,
		`xeno_hiraeth`,
		`euphie___`,
		`unknownnie`,
		`theyolotato`,
		`charliosaurus`,
		`jutstreams`,
		`mikewhatwhere`,
		`studypaws`,
		`pcc_lanezzz`,
		`workwithjandj`,
		`studylena`,
	];

	// loop through list of streamers
	for (let i = 0; i < listOfStreamers.length; i++) {
		addTask(listOfStreamers[i], "#fff", `test task ${i}`);
		doneTask(listOfStreamers[i]);
	}
}

function tests() {
	// oneLineTasks();
	// multiUserLineTasks();
	oneLineDoneTasks();
}

// hex to rgb that accepts 3 or 6 digits
function hexToRgb(hex) {
	// remove # if present
	if (hex[0] === "#") {
		hex = hex.slice(1);
	}

	let r = 0,
		g = 0,
		b = 0;

	if (hex.length == 3) {
		// 3 digits
		r = "0x" + hex[0] + hex[0];
		g = "0x" + hex[1] + hex[1];
		b = "0x" + hex[2] + hex[2];
	} else if (hex.length == 6) {
		// 6 digits
		r = "0x" + hex[0] + hex[1];
		g = "0x" + hex[2] + hex[3];
		b = "0x" + hex[4] + hex[5];
	}

	// interger value of rgb
	r = +r;
	g = +g;
	b = +b;

	return `${r}, ${g}, ${b}`;
}

let currentTitle = 0;
// interval the task title
setInterval(async () => {
	let taskTitle = document.getElementById("title");

	// cycle through a list of titles
	const titles = configs.titles;

	// if current title is the last title, set it to the first title
	if (currentTitle === titles.length - 1) {
		currentTitle = 0;
	} else {
		currentTitle++;
	}

	// on change title, add fade animation
	taskTitle.classList.add("fade");
	await sleep(500);

	// set new title
	taskTitle.innerText = titles[currentTitle];

	await sleep(100);

	// remove fade animation
	taskTitle.classList.remove("fade");
}, 8000);

// on window load
window.onload = function () {
	importStyles();
	// resetDB();
	setupDB();
	renderTaskList();
	// tests();
};
