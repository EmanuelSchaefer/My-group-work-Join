/**
 * Displays the specified category in the category display element.
 * If the category is already displayed, hides the category display element.
 * @param {string} category - The category to display.
 */
function displayCategory(category) {
  const categoryDisplay = document.getElementById("categoryDisplay");
  const selectedCategory = categoryDisplay.textContent;

  if (selectedCategory !== category) {
    hideCategoryDisplay(categoryDisplay);
  }

  categoryDisplay.style.display = "block";
  categoryDisplay.textContent = category;
}

/**
 * Displays an error message by creating a new span element and appending it to the error message container.
 * @param {string} message - The error message to display.
 */
function displayErrorMessage(message) {
  const errorMessage = document.createElement("span");
  errorMessage.textContent = message;
  document.getElementById("errorMessage").appendChild(errorMessage);
}

/**
 * Hides the error label by clearing its content.
 */
function hideLabel() {
  document.getElementById("errorMessage").textContent = "";
}

/**
 * Hides the category display by setting its display style to "none" and clearing its content.
 */
function hideCategoryDisplay() {
  const categoryDisplay = document.getElementById("categoryDisplay");
  categoryDisplay.style.display = "none";
  categoryDisplay.textContent = "";
}

/**
 * Closes the popup task by adjusting the visibility of related elements.
 * If the current page is board.html, removes the "hidden" class from the board body element.
 * Removes the "d-none" class from the board main container element and adds it to the popup element.
 */
function closePopupTask() {
  let boardBody = document.querySelector(".body-board");
  let boardMainContainer = document.querySelector(".board-main-container");
  let popup = document.getElementById("addtask-popup");

  if (window.location.pathname.includes("board.html")) {
    boardBody.classList.remove("hidden");
  }
  boardMainContainer.classList.remove("d-none");
  popup.classList.add("d-none");
}

/**
 * Clears the checkboxes in the dropdown content by unchecking all the checked checkboxes.
 */
function clearCheckboxes() {
  let checkboxes = document.querySelectorAll(
    "#dropdownContent input[type=checkbox]:checked"
  );

  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
  toggleDropdown();
}

/**
 * Hides the select color element by adding the "d-none" class to it.
 */
function hideSelectColor() {
  document.getElementById("select-color-category").classList.add("d-none");
}

/**
 * Hides the error message by clearing its content.
 */
function hideErrorMessage() {
  document.getElementById("errorMessage").textContent = "";
}

/**
 * Hides the category display by setting its display style to "none" and clearing its content.
 */
function hideCategoryDisplay() {
  document.getElementById("categoryDisplay").style.display = "none";
  document.getElementById("categoryDisplay").textContent = "";
}

/**
 * Clears the selections and resets the UI elements related to category selection.
 * Calls the necessary functions to render the normal category field, render the category list,
 * hide the select color element, hide the error message, and hide the category display.
 */
function clearSelections() {
  renderNormalCategoryField();
  renderCategoryList();
  hideSelectColor();
  hideErrorMessage();
  hideCategoryDisplay();
}

/**
 * Show the edit task popup.
 */
function showEditTaskPopUp() {
  var overlay = document.getElementById("editTaskPopUp");
  overlay.style.display = "block";
}

function hideEditTaskPopUp() {
  var overlay = document.getElementById("editTaskPopUp");
  overlay.style.display = "none";
}

function showAddTaskPopUp() {
  var overlay = document.getElementById("addTaskPopUp");
  overlay.style.display = "block";
}

/**
 * Hide the "Add Task" popup.
 */
function hideAddTaskPopUp() {
  var overlay = document.getElementById("addTaskPopUp");
  overlay.style.display = "none";
}

//urgent button changes
async function TaskButtonUrgent() {
  let buttonUrgent = document.getElementById("prioUrgent");
  let buttonMedium = document.getElementById("prioMedium");
  let buttonLow = document.getElementById("prioLow");
  buttonUrgent.style.backgroundColor = "#FF3D00";
  buttonUrgent.style.filter = "contrast(1)";
  buttonMedium.style.filter = "contrast(1)";
  buttonLow.style.filter = "contrast(1)";
  buttonMedium.style.backgroundColor = "white";
  buttonLow.style.backgroundColor = "white";
  buttonMedium.style.color = "black";
  buttonUrgent.style.color = "white";
  buttonLow.style.color = "black";

  let imageMedium = document.getElementById("imgMedium");
  imageMedium.style.filter = "none";

  let imageLow = document.getElementById("imgLow");
  imageLow.style.filter = "none";

  let imageUrgent = document.getElementById("imgUrgent");
  imageUrgent.style.filter = "brightness(10000%) contrast(1000%)";
}

//prio status
function getPrioStatus(prioStatus) {
  currentPrioStatus = prioStatus;
}

//set the priortiy of the task
function setPrioStatus(prioStatus) {
  let prioValue = document.getElementById("prioValue");
  prioValue.innerText = prioStatus;
}

//Medium button changes
async function TaskButtonMedium() {
  let buttonUrgent = document.getElementById("prioUrgent");
  let buttonMedium = document.getElementById("prioMedium");
  let buttonLow = document.getElementById("prioLow");
  buttonUrgent.style.backgroundColor = "white";
  buttonMedium.style.backgroundColor = "#FFA800";
  buttonUrgent.style.filter = "contrast(1)";
  buttonMedium.style.filter = "contrast(1)";
  buttonLow.style.filter = "contrast(1)";
  buttonMedium.style.color = "white";
  buttonUrgent.style.color = "black";
  buttonLow.style.color = "black";
  buttonLow.style.backgroundColor = "white";

  let imageUrgent = document.getElementById("imgUrgent");
  imageUrgent.style.filter = "none";

  let imageLow = document.getElementById("imgLow");
  imageLow.style.filter = "none";

  let imageMedium = document.getElementById("imgMedium");
  imageMedium.style.filter = "brightness(10000%) contrast(1000%)";
}

//low button changes
async function TaskButtonLow() {
  let buttonUrgent = document.getElementById("prioUrgent");
  let buttonMedium = document.getElementById("prioMedium");
  let buttonLow = document.getElementById("prioLow");
  buttonUrgent.style.backgroundColor = "white";
  buttonMedium.style.backgroundColor = "white";
  buttonLow.style.backgroundColor = "#7AE229";
  buttonUrgent.style.filter = "contrast(1)";
  buttonMedium.style.filter = "contrast(1)";
  buttonMedium.style.color = "black";
  buttonUrgent.style.color = "black";
  buttonLow.style.color = "white";

  let imageUrgent = document.getElementById("imgUrgent");
  imageUrgent.style.filter = "none";

  let imageMedium = document.getElementById("imgMedium");
  imageMedium.style.filter = "none";

  let imageLow = document.getElementById("imgLow");
  imageLow.style.filter = "brightness(10000%) contrast(1000%)";
}

//delete task permanently
async function deleteAllTasksFromServer() {
  try {
    tasks = JSON.parse(await getItem("tasks"));
    toDo = JSON.parse(await getItem("toDo"));
    inProgress = JSON.parse(await getItem("inProgress"));
    feedback = JSON.parse(await getItem("feedback"));
    done = JSON.parse(await getItem("done"));

    tasks = [];
    toDo = [];
    inProgress = [];
    feedback = [];
    done = [];
    await setItem("tasks", JSON.stringify(tasks));
    await setItem("toDo", JSON.stringify(toDo));
    await setItem("inProgress", JSON.stringify(inProgress));
    await setItem("feedback", JSON.stringify(feedback));
    await setItem("done", JSON.stringify(done));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * Validate the task form before adding a new task.
 * @returns {boolean} - Returns true if the form is valid, false otherwise.
 */
async function validateTaskForm() {
  let taskTitle = document.getElementById("title");
  let taskDescription = document.getElementById("description");
  let taskDueDate = document.getElementById("datePicker");
  let taskSub = document.getElementById("subtaskContent");

  if (
    taskTitle.value === "" ||
    taskDescription.value === "" ||
    taskDueDate.value === "" ||
    currentPrioStatus === undefined ||
    selectedCategory === undefined ||
    taskSub.value === ""
  ) {
    let taskAlert = document.getElementById("taskAlert");
    taskAlert.innerHTML = "";
    if (taskTitle.value === "")
      taskAlert.innerHTML += "Feld 'Titel' muss ausgefüllt werden.<br>";
    if (taskDescription.value === "")
      taskAlert.innerHTML += "Feld 'Beschreibung' muss ausgefüllt werden.<br>";
    if (taskDueDate.value === "")
      taskAlert.innerHTML +=
        "Feld 'Fälligkeitsdatum' muss ausgefüllt werden.<br>";
    if (currentPrioStatus === undefined)
      taskAlert.innerHTML += "Feld 'Priorität' muss ausgefüllt werden.<br>";
    if (selectedCategory === undefined)
      taskAlert.innerHTML += "Feld 'Category' muss ausgefüllt werden.<br>";
    if (taskSub.value === "")
      taskAlert.innerHTML += "Feld 'Unteraufgabe' muss ausgefüllt werden.<br>";
    return false;
  }

  return true;
}

function validateSubtasksForm(currentTask) {
  currentTask["subtasksClosed"] = [];
  currentTask["subtasksOpened"] = [];

  let checkboxes = document.querySelectorAll(
    "#subtaskContent input[type=checkbox]:checked"
  );
  let NullCheckboxes = document.querySelectorAll(
    "#subtaskContent input[type=checkbox]:not(:checked)"
  );

  for (var i = 0; i < checkboxes.length; i++) {
    const value = checkboxes[i].value;
    currentTask["subtasksClosed"].push({
      name: value,
    });
  }
  for (var i = 0; i < NullCheckboxes.length; i++) {
    const value = NullCheckboxes[i].value;
    currentTask["subtasksOpened"].push({
      name: value,
    });
  }
}

function hideTask(taskCardContainer) {
  if (taskCardContainer) {
    taskCardContainer.style.display = "none"; //Display property to none
  }
}

function showTask(taskCardContainer) {
  if (taskCardContainer) {
    taskCardContainer.style.display = ""; // Resets the display property to its default value
  }
}

async function deleteObjectById(id) {
  for (var i = 0; i < toDo.length; i++) {
    if (toDo[i] == id) {
      toDo.splice(i, 1);
      await setItem("toDo", JSON.stringify(toDo));
      return;
    }
  }

  for (var i = 0; i < inProgress.length; i++) {
    if (inProgress[i] == id) {
      inProgress.splice(i, 1);
      await setItem("inProgress", JSON.stringify(inProgress));
      return;
    }
  }

  for (var i = 0; i < feedback.length; i++) {
    if (feedback[i] == id) {
      feedback.splice(i, 1);
      await setItem("feedback", JSON.stringify(feedback));
      return;
    }
  }

  for (var i = 0; i < done.length; i++) {
    if (done[i] == id) {
      done.splice(i, 1);
      await setItem("done", JSON.stringify(done));
      return;
    }
  }
}
