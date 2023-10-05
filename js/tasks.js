let tasks = [];
let subtasks = [];
let currentTaskID;
let selectedCategory;
let currentPrioStatus;
let selectedColor;
let categories = [
  {
    name: "Sales",
    color: "pink",
  },
  {
    name: "Marketing",
    color: "blue",
  },
  {
    name: "Design",
    color: "orange",
  },
  {
    name: "code",
    color: "red",
  },
];

// initialize tasks, categoories
async function initTasks() {
  await loadTasks();
  await loadUsers();
  loadCategories();
  renderAssignableContacts();
  renderCategoryList();
}

/**
 * Add a new task.
 * @param {string} status - The status of the task (e.g., "toDo", "inProgress", "feedback", "done").
 */
async function addNewTask(status) {
  const isValid = await validateTaskForm();
  if (!isValid) return;

  await setNewTaskID();
  await loadtoDos();

  let taskTitle = document.getElementById("title");
  let taskDescription = document.getElementById("description");
  let taskDueDate = document.getElementById("datePicker");

  tasks.push({
    title: taskTitle.value,
    description: taskDescription.value,
    category: selectedCategory,
    prio: currentPrioStatus,
    color: selectedColor,
    assignments: validateAssignmentForm(),
    dueDate: taskDueDate.value,
    taskSub: subtasks,
    subtasksOpened: subtasks,
    subtasksClosed: [],
    id: currentTaskID,
  });
  // Update the status array based on the task status
  if (status === "toDo") {
    toDo.push(currentTaskID);
  } else if (status === "inProgress") {
    inProgress.push(currentTaskID);
  } else if (status === "feedback") {
    feedback.push(currentTaskID);
  } else if (status === "done") {
    done.push(currentTaskID);
  }

  const taskAddedElement = document.getElementById("taskAdded");
  taskAddedElement.classList.remove("d-none");
  // Store the tasks and status arrays in local storage
  setTimeout(async () => {
    await setItem("tasks", JSON.stringify(tasks));
    await setItem("toDo", JSON.stringify(toDo));
    await setItem("inProgress", JSON.stringify(inProgress));
    await setItem("feedback", JSON.stringify(feedback));
    await setItem("done", JSON.stringify(done));
    await setItem("category", JSON.stringify(categories));
    taskAddedElement.classList.add("d-none");
    redirectToBoard();
  }, 500);
}

/**
 * Disable the date input field for past dates.
 */
function disableDateinput() {
  var today = new Date().toISOString().split("T")[0];
  document.getElementsByName("input-date")[0].setAttribute("min", today);
}

//loads subtasks
async function subTasksLoad() {
  subtasks = [];
  for (let i = 0; i < subtasks.length; i++) {
    const subtask = subtasks[i];
  }
}

//set a new Id to the added task
async function setNewTaskID() {
  try {
    let res = JSON.parse(await getItem("currentTaskID"));
    currentTaskID = res + 1;
    await setItem("currentTaskID", JSON.stringify(currentTaskID));
  } catch (e) {
    currentTaskID = 1;
    await setItem("currentTaskID", JSON.stringify(currentTaskID));
  }
}

//load task from localstorage
async function loadTasks() {
  try {
    const storedTasks = JSON.parse(await getItem("tasks"));
    tasks = tasks.concat(storedTasks);
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * Add a subtask to the task with the specified ID.
 * @param {number} id - The ID of the task.
 */
async function subTaskAddToJson() {
  let task = document.getElementById("subtask-input-content");

  subtasks.push({
    task: task.value,
  });

  addNewSubTask();
  task.value = "";
}

/**
 * Adds a subtask to a task from the edit view.
 * @param {string} id - The ID of the task.
 */
async function addSubtaskFromEdit(id) {
  let currentTask = tasks.find((task) => task.id == id);
  let task = document.getElementById("subtask-input-content");
  currentTask["taskSub"].push({
    task: task.value,
  });
  currentTask["subtasksOpened"].push({
    task: task.value,
  });
  await showTickableSubtasks(currentTask);
  task.value = "";
}

//new subtask to the element
async function addNewSubTask() {
  let subtaskContent = document.getElementById("subtaskContent");
  subtaskContent.innerHTML = "";

  for (let i = 0; i < subtasks.length; i++) {
    let task = subtasks[i]["task"];
    subtaskContent.innerHTML += `
    <div>${task}</div>`;
  }
}

/**
 * Edit the task on the board.
 * @param {number} id - The ID of the task.
 */
async function editTaskBoard(id) {
  let currentTask = tasks.find((task) => task.id == id);
  let taskTitle = document.getElementById("title");
  let taskDescription = document.getElementById("description");
  let taskDueDate = document.getElementById("datePicker");

  currentTask["title"] = taskTitle.value;
  currentTask["description"] = taskDescription.value;
  currentTask["category"] = document.getElementById("categoryEdit").innerText;
  currentTask["prio"] = document.getElementById("prioValue").innerText;
  currentTask["color"] = selectedColor;
  currentTask["assignments"] = validateAssignmentForm();
  currentTask["dueDate"] = taskDueDate.value;
  validateSubtasksForm(currentTask);

  const taskAddedElement = document.getElementById("taskAdded");
  taskAddedElement.classList.remove("d-none");

  setCategoryForEdit(currentTask);

  setTimeout(() => {
    taskAddedElement.classList.add("d-none");
    reloadPage();
  }, 1000);

  await setItem("tasks", JSON.stringify(tasks));
  await setItem("toDo", JSON.stringify(toDo));
}

/**
 * Sets the category value for editing a task.
 * @param {object} currentTask - The current task object.
 */
async function setCategoryForEdit(currentTask) {
  document.getElementById("categoryEdit").innerText = currentTask["category"];
}

/**
 * Reloads the current page.
 */
function reloadPage() {
  location.reload();
}

/**
 * Redirects the user to the "board.html" page.
 */
function redirectToBoard() {
  window.location.href = "board.html";
}

/**
 * Redirects the user to the "../../board.html" page from a popup or nested directory.
 */
function redirectToBoardFromPopup() {
  window.location.href = "../../board.html";
}

//save categories to local storage
function saveCategories() {
  localStorage.setItem("categories", JSON.stringify(categories));
}

//load from local storage
function loadCategories() {
  const storedCategories = JSON.parse(localStorage.getItem("categories"));
  if (storedCategories) {
    categories = storedCategories;
  }
}

/**
 * Check the screen width and perform actions accordingly.
 */
function checkScreenWidth() {
  document
    .getElementById("editTaskPopUp")
    .addEventListener("click", checkScreenWidth);

  var screenWidth = window.innerWidth;

  var targetWidth = 1351;

  if (screenWidth >= targetWidth) {
    showEditTaskPopUp();
  } else {
    window.location.href = "task_form.html";
  }
}

/**
 * Toggle the assignment dropdown.
 */
function toggleDropdown() {
  let dropdownContent = document.getElementById("dropdownContent");
  let dropdownMin = document.getElementById("dropdownMin");
  dropdownContent.classList.toggle("show");
  dropdownMin.classList.toggle("open");

  // Hide dropdown content after selection
  if (!dropdownContent.classList.contains("show")) {
    hideSelectColor();
  }
}

/**
 * Renders a list of assignable contacts in the dropdown container.
 */
async function renderAssignableContacts() {
  let assignableContactsContainer = document.getElementById("dropdownContent");
  for (let i = 0; i < users.length; i++) {
    const name = users[i]["name"];
    const id = users[i]["id"];

    const div = document.createElement("div");
    div.className = "dropdown-object";
    div.addEventListener("click", function () {
      toggleCheckbox(id);
    });

    const span = document.createElement("span");
    span.innerText = name;
    div.appendChild(span);

    const checkbox = document.createElement("input");
    checkbox.id = id;
    checkbox.type = "checkbox";
    checkbox.value = name;
    checkbox.dataset.id = id;
    checkbox.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    div.appendChild(checkbox);
    assignableContactsContainer.appendChild(div);
  }
}

/**
 * Toggles the checkbox's checked state based on the provided checkbox ID.
 * @param {string} checkboxId - The ID of the checkbox.
 */
function toggleCheckbox(checkboxId) {
  var checkbox = document.getElementById(checkboxId);
  checkbox.checked = !checkbox.checked;
}

/**
 * Renders the category list in the dropdown container.
 */
function renderCategoryList() {
  let categoryListContainer = document.getElementById(
    "dropdownCategoryContent"
  );
  categoryListContainer.innerHTML = "";
  categoryListContainer.innerHTML += categoryListHTML();
}

/**
 * Renders the new category field in the dropdown container.
 */
function renderNewCategoryField() {
  let dropdownField = document.getElementById("dropdownMinCategory");
  document.getElementById("select-color-category").classList.remove("d-none");
  document.getElementById("dropdownCategoryContent").classList.remove("d-none");
  dropdownField.innerHTML = categoryFieldHTML();
  hideCategoryDisplay();
}

/**
 * Stops event propagation for the provided event.
 * @param {Event} event - The event object.
 */
function stopDropdown(event) {
  event.stopPropagation();
}

/**
 * Renders a normal category field in the dropdown container.
 */
function renderNormalCategoryField() {
  document.getElementById("categoryDisplay").style.display = "none";

  let dropdownField = document.getElementById("dropdownMinCategory");
  document.getElementById("dropdownCategoryContent").classList.remove("d-none");
  dropdownField.innerHTML = normalCategoryFiledHTML();
}

/**
 * Saves the selected category and updates the UI elements accordingly.
 * @param {HTMLElement} element - The clicked element representing the selected category.
 * @param {string} color - The color associated with the selected category.
 */
function saveSelectedCategory(element, color) {
  selectedCategory = element.innerText;
  let dataField = document.getElementById("categoryEdit");
  dataField.innerText = selectedCategory;
  let dropdownMin = document.getElementById("dropdownMinCategory");
  dropdownMin.querySelector("span").innerText = selectedCategory;
  selectedColor = color;
  toggleDropdownCategory();
}

/**
 * Toggles the visibility of the category dropdown content and updates the dropdown toggle button.
 */
function toggleDropdownCategory() {
  let dropdownContent = document.getElementById("dropdownCategoryContent");
  let dropdownMin = document.getElementById("dropdownMinCategory");
  dropdownContent.classList.toggle("show");
  dropdownMin.classList.toggle("open");
}

/**
 * Validates the assignment form and returns the selected values as an array of objects.
 * @returns {Array} The selected values from the assignment form.
 */
function validateAssignmentForm() {
  let selectedValues = [];
  let checkboxes = document.querySelectorAll(
    "#dropdownContent input[type=checkbox]:checked"
  );

  for (var i = 0; i < checkboxes.length; i++) {
    const value = checkboxes[i].value;
    const id = checkboxes[i].dataset.id;
    selectedValues.push({
      id,
      name: value,
    });
  }
  return selectedValues;
}

/**
 * Updates the task card icons based on the provided ID.
 * @param {string} id - The ID of the task priority.
 */
function updateTaskCardIcons(id) {
  const imgUrgentTask = document.getElementById("imgUrgentTask");
  const imgMediumTask = document.getElementById("imgMediumTask");
  const imgLowTask = document.getElementById("imgLowTask");

  if (imgUrgentTask && imgMediumTask && imgLowTask) {
    // Verstecke alle Icons
    imgUrgentTask.classList.add("d-none");
    imgMediumTask.classList.add("d-none");
    imgLowTask.classList.add("d-none");

    // Zeige das entsprechende Icon basierend auf prio
    if (id === "urgent") {
      imgUrgentTask.classList.remove("d-none");
    } else if (id === "medium") {
      imgMediumTask.classList.remove("d-none");
    } else if (id === "low") {
      imgLowTask.classList.remove("d-none");
    }
  }
}

/**
 * Selects the color based on the provided ID and updates the UI accordingly.
 * @param {number} id - The ID of the color.
 */
function selectColor(id) {
  for (let i = 1; i < 8; i++) {
    document.getElementById(`color${i}`).classList.remove("selected-color");
  }
  document.getElementById(`color${id}`).classList.add("selected-color");
  selectedColor = document.getElementById(`color${id}`).style.backgroundColor;
}

/**
 * Checks the new category input and handles the logic based on the input values.
 * Updates the selected category, displays the category in the UI, and saves the category data.
 * Displays an error message if the input values are invalid.
 */
function checkNewCategory() {
  const newCategoryInput = document.getElementById("new-category");
  const categoryDisplay = document.getElementById("categoryDisplay");
  const dataField = document.getElementById("categoryEdit");
  const categoryInputField = document.getElementById("new-category");
  const categoryContent = document.getElementById("dropdownCategoryContent");

  if (selectedColor && newCategoryInput.value !== "") {
    selectedCategory = newCategoryInput.value;
    dataField.innerText = newCategoryInput.value;
    displayCategory(selectedCategory);
    categories.push({
      name: selectedCategory,
      color: selectedColor,
    });
    renderCategoryList(); // Update the dropdownCategoryContent with the new category
    saveCategories(); // Store the updated categories in local storage
  } else {
    displayErrorMessage("Please insert a category name and a color!");
  }

  if (newCategoryInput.value === "") {
    hideCategoryDisplay(categoryDisplay);
  }
}
