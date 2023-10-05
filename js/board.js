// arrays for different task categories
let toDo = [];
let inProgress = [];
let feedback = [];
let done = [];

// // Initialize the board by clearing the tasks container and loading tasks and users
async function initBoard() {
  clearTasksContainer();
  await loadTasks();
  await loadtoDos();
  await loadInProgress();
  await loadFeedback();
  await loadDone();
  await loadUsers();
  renderBoard();
}

// loadtasks from storage
async function loadTasks() {
  try {
    tasks = JSON.parse(await getItem("tasks"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}
// render task on board
function renderBoard() {
  renderTaskCardToDo();
  renderTaskCardProgress();
  renderTaskCardFeedback();
  renderTaskCardDone();
  // get task count for summary
  const taskCountBoard = tasks.length;
  const taskCountInProgress = inProgress.length;
  const taskCountFeedback = feedback.length;
  const taskCountUrgent = tasks.filter((task) => task.prio === "up").length;
  const taskCountToDo = toDo.length;
  const taskCountDone = done.length;
}

async function loadtoDos() {
  try {
    toDo = JSON.parse(await getItem("toDo"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

async function loadInProgress() {
  try {
    inProgress = JSON.parse(await getItem("inProgress"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

async function loadFeedback() {
  try {
    feedback = JSON.parse(await getItem("feedback"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

async function loadDone() {
  try {
    done = JSON.parse(await getItem("done"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}
// Render the to-do task cards
function renderTaskCardToDo() {
  let toDoContainer = document.getElementById("toDo");
  let renderedIDs = {};
  for (let i = 0; i < toDo.length; i++) {
    let currentTask = tasks.find((task) => task.id === toDo[i]);
    if (currentTask && !renderedIDs[currentTask.id]) {
      toDoContainer.innerHTML += getTaskCardHTML(currentTask, "toDo");
      renderedIDs[currentTask.id] = true;
      renderAvatars(currentTask);
    }
  }
}
// Render the progress task cards
async function renderTaskCardProgress() {
  let progressContainer = document.getElementById("inProgress");
  let renderedIDs = {};
  await loadTasks();

  for (let i = 0; i < inProgress.length; i++) {
    let currentTask = tasks.find((task) => task.id === inProgress[i]);

    if (currentTask && !renderedIDs[currentTask.id]) {
      progressContainer.innerHTML += getTaskCardHTML(currentTask, "inProgress");
      renderedIDs[currentTask.id] = true;
      renderAvatars(currentTask);
    }
  }
}
// Render the feedback task cards
function renderTaskCardFeedback() {
  let feedbackContainer = document.getElementById("feedback");
  let renderedIDs = {};
  for (let i = 0; i < feedback.length; i++) {
    let currentTask = tasks.find((task) => task.id === feedback[i]);
    if (currentTask && !renderedIDs[currentTask.id]) {
      feedbackContainer.innerHTML += getTaskCardHTML(currentTask, "feedback");
      renderedIDs[currentTask.id] = true;
      renderAvatars(currentTask);
    }
  }
}
// Render the done task cards
async function renderTaskCardDone() {
  let doneContainer = document.getElementById("done");
  let renderedIDs = {};
  await loadTasks();

  for (let i = 0; i < done.length; i++) {
    let currentTask = tasks.find((task) => task.id === done[i]);

    if (currentTask && !renderedIDs[currentTask.id]) {
      doneContainer.innerHTML += getTaskCardHTML(currentTask, "done");
      renderedIDs[currentTask.id] = true;
      renderAvatars(currentTask);
    }
  }
}
// clear task container
function clearTasksContainer() {
  let toDoContainer = document.getElementById("toDo");
  let progressContainer = document.getElementById("inProgress");
  let feedbackContainer = document.getElementById("feedback");
  let doneContainer = document.getElementById("done");

  toDoContainer.innerHTML = "";
  progressContainer.innerHTML = "";
  feedbackContainer.innerHTML = "";
  doneContainer.innerHTML = "";
}
// render avatars for assigned contacts in a task
async function renderAvatars(currentTask) {
  let avatarBox = document.getElementById("avatarBox" + currentTask["id"]);
  for (let i = 0; i < currentTask["assignments"].length; i++) {
    const name = currentTask["assignments"][i]["name"];
    let id = currentTask["assignments"][i]["id"];
    let color = getUserColor(id);
    let initials = name.match(/\b(\w)/g);
    initials = initials.join("").toUpperCase();
    avatarBox.innerHTML += `       
        <div class="avatar-container" style="background-color:${color}">${initials}</div>
    `;
  }
}

function getUserColor(id) {
  let currentUser = users.find((user) => user.id == id);
  if (currentUser) {
    const color = currentUser.color;
    return color;
  } else {
    throw new Error(`Benutzer mit ID ${id} wurde nicht gefunden.`);
  }
}
// detail task for the card
function showDetailCard(id) {
  const overlay = document.getElementById("overlay");
  const bodyBoard = document.getElementsByClassName("body-board")[0];
  const boardContainer = document.getElementsByClassName(
    "board-main-container"
  )[0];

  showOverlay(overlay, bodyBoard, boardContainer);

  overlay.innerHTML = "";

  const task = findTaskById(id);
  if (task) {
    appendTaskDetails(overlay, task);
    getTaskPrio(task);
    getAssignedToDetailCard(task, id);
    showSubtasks(task);
  }

  addOverlayClickListener(overlay);
}
// show overlay by updating classes
function showOverlay(overlay, bodyBoard, boardContainer) {
  overlay.classList.remove("d-none");
  bodyBoard.classList.add("hidden");
  boardContainer.classList.add("zero-margin-top");
}

function findTaskById(id) {
  return tasks.find((task) => task.id === id);
}

function appendTaskDetails(overlay, task) {
  overlay.innerHTML += getTaskDetailCardHTML(task);
}

function addOverlayClickListener(overlay) {
  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      overlay.classList.add("d-none");
      overlay.innerHTML = "";
    }
  });
}

// get the priority of a task and render it ot detail
async function getTaskPrio(task) {
  let prioContainer = document.getElementById("prioDetail");
  switch (task["prio"]) {
    case "down":
      prioContainer.innerHTML += `
        <div
        class="prio-btn-low" 
    >
        Low
        <img id="imgUrgent" src="./assets/img/prioLow.svg" alt="" />
    </div>
        `;
      break;
    case "medium":
      prioContainer.innerHTML += `
        <div
        class="prio-btn-medium"
    >
        Medium
        <img id="imgUrgent" src="./assets/img/prioMedium.svg" alt="" />
    </div>
        `;
      break;
    case "up":
      prioContainer.innerHTML += `
        <div
        class="prio-btn-urgent"
    >
        Urgent
        <img id="imgUrgent" src="./assets/img/prioUrgent.svg" alt=""/>
    </div>
        `;
      break;
  }
}
// get assigned contact and render it to detail card
function getAssignedToDetailCard(task) {
  let assignContainer = document.getElementById("assignDetail");
  for (let i = 0; i < task["assignments"].length; i++) {
    const contact = task["assignments"][i]["name"];
    const id = task["assignments"][i]["id"];
    let color = getUserColor(id);
    let initials = contact.match(/\b(\w)/g);
    initials = initials.join("").toUpperCase();
    assignContainer.innerHTML += `
    <div class="flex-row align-center gap-15">
        <div class="avatar-container" style="background-color:${color}">${initials}</div>
        <div class="font-weight-500 name" >${contact}</div>
    </div>
    `;
  }
}

function redirectToAddTaskPopup() {
  window.location.href = "addtask-popup.html";
}

function redirectToAddTaskPopupOne() {
  window.location.href = "../assets/templates/addtask-popup.html";
}

function closePopup() {
  let overlay = document.getElementById("overlay");
  let bodyBoard = document.getElementsByClassName("body-board")[0];
  let popup = document.querySelector(".overlay-addtask-popup");
  bodyBoard.classList.remove("hidden");
  overlay.classList.add("d-none");
}

async function deleteTask(id) {
  deleteObjectById(id);
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i]["id"] == id) {
      tasks.splice(i, 1);
      await setItem("tasks", JSON.stringify(tasks));
      break;
    }
  }
  closePopup();
  initBoard();
}
// edit task by its ID (open)
function editTask(id) {
  currentTaskID = id;
  let currentTask = tasks.find((task) => task.id == id);
  document.getElementById("taskContent").innerHTML = editTaskHTML(currentTask);
  renderCategoryList();
  showAssignedContacts(currentTask);
  showTickableSubtasks(currentTask);
  setCategoryForEdit(currentTask);
}

function showAssignedContacts(currentTask) {
  let assignableContactsContainer = document.getElementById("dropdownContent");
  const assignedContacts = currentTask["assignments"].map(
    (assignment) => assignment["name"]
  );

  for (let i = 0; i < users.length; i++) {
    const name = users[i]["name"];
    const id = users[i]["id"];
    const checkbox = document.createElement("input");
    checkbox.id = id;
    checkbox.type = "checkbox";
    checkbox.value = name;
    checkbox.dataset.id = id;
    checkbox.onclick = function (event) {
      event.stopPropagation();
    };

    if (assignedContacts.includes(name)) {
      checkbox.checked = true;
    }

    const div = document.createElement("div");
    div.className = "dropdown-object";
    div.onclick = function () {
      toggleCheckbox(id);
    };
    div.innerHTML = `<span>${name}</span>`;
    div.appendChild(checkbox);

    assignableContactsContainer.appendChild(div);
  }
}

function toggleCheckbox(checkboxId) {
  var checkbox = document.getElementById(checkboxId);
  checkbox.checked = !checkbox.checked;
}
// Get the current date in YYYY-MM-DD format
function getCurrentDate() {
  const today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  const year = today.getFullYear();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return `${year}-${month}-${day}`;
}

function toggleDropdownCategory() {
  let dropdownContent = document.getElementById("dropdownCategoryContent");
  let dropdownMin = document.getElementById("dropdownMinCategory");
  dropdownContent.classList.toggle("show");
  dropdownMin.classList.toggle("open");
}

function showSubtasks(task) {
  let container = document.getElementById("subtasksContainer");
  for (let i = 0; i < task["taskSub"].length; i++) {
    const subTask = task["taskSub"][i]["task"];
    container.innerHTML += `<li>${subTask}</li>`;
  }
}

function searchForTaskByInput() {
  let search = document
    .getElementById("search-input")
    .value.trim()
    .toLowerCase(); //gets the value+ changes it to lower case

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const title = task["title"] || "";
    const description = task["description"] || "";
    const taskCardContainer = document.getElementById(task["id"]);

    if (
      search === "" ||
      title.toLowerCase().includes(search) ||
      description.toLowerCase().includes(search)
    ) {
      showTask(taskCardContainer);
    } else {
      hideTask(taskCardContainer);
    }
  }
}

async function showTickableSubtasks(currentTask) {
  let subtasksContainer = document.getElementById("subtaskContent");
  subtasksContainer.innerHTML = "";

  for (let i = 0; i < currentTask["taskSub"].length; i++) {
    const subtask = currentTask["taskSub"][i]["task"];
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = subtask;

    const isClosed = currentTask["subtasksClosed"].some(
      (sub) => sub.name === subtask
    );
    checkbox.checked = isClosed;

    const div = document.createElement("div");
    div.classList.add("subtasks-row");
    div.innerHTML = `<span>${subtask}</span>`;
    div.insertBefore(checkbox, div.firstChild);

    subtasksContainer.appendChild(div);
  }
}

function openAddTaskPopup(status) {
  const popupOverlay = document.getElementById("addtask-popup");
  const bodyBoard = document.getElementsByClassName("body-board")[0];
  const boardContent = document.getElementsByClassName(
    "board-main-container"
  )[0];

  if (window.location.pathname.includes("board.html")) {
    bodyBoard.classList.add("hidden");
  }

  if (window.location.pathname.includes("contacts.html")) {
    const body = document.getElementsByTagName("body")[0];
    body.style.overflowY = "scroll";
  }

  popupOverlay.classList.remove("d-none");
  boardContent.classList.add("d-none");

  popupOverlay.innerHTML = addTaskPopupHTML(status);
}

// count number of tasks in category for summary
function countTasks(category) {
  let count = 0;

  switch (category) {
    case "board":
      count = tasks.length;
      break;
    case "inProgress":
      count = inProgress.length;
      break;
    case "feedback":
      count = feedback.length;
      break;
    case "urgent":
      count = tasks.filter((task) => task.prio === "up").length;
      break;
    case "toDo":
      count = toDo.length;
      break;
    case "done":
      count = done.length;
      break;
  }
  return count;
}
