/**
 * Loads the necessary data upon page load.
 * Calls the greetingDay and activeUser functions asynchronously.
 */
let fromLocalStorage;

async function load() {
  await greetingDay();
  await activeUser();
}

// greeting day on
async function greetingDay() {
  document.getElementById("dayGreeting").innerText = await alldayGreeting();
}

async function alldayGreeting() {
  let hour = new Date().getHours();
  if (4 <= hour && hour <= 11) {
    return "Good morning,";
  }
  if (11 < hour && hour <= 19) {
    return "Good afternoon,";
  }
  if (19 < hour || hour < 4) {
    return "Good evening,";
  }
}

/**
 * Formats a date string into a localized date format.
 * @param {string} dateString - The date string to format.
 * @returns {string} The formatted date string in the format: "Month Day".
 */
function formatDate(dateString) {
  const months = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  // Create a new Date object from the dateString
  const date = new Date(dateString);

  // Get the month index, day, and year from the date object
  const monthIndex = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  // Format the date string using the localized month name, day, and year
  const formattedDate = `${months[monthIndex]} ${day}, ${year}`;

  // Update the date container element with the formatted date
  document.getElementById(
    "dateContainer"
  ).innerHTML = `<strong>${formattedDate}</strong>`;
}

// Execute the following code when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Create a new Date object with the current date
  const inputDate = new Date();

  // Format the input date and update the date container element
  formatDate(inputDate);
});
// greeting day off

//go to Board
function toBoard() {
  window.location.href = "board.html";
}

// greet name on
async function activeUser() {
  await usersName();
}

/**
 * Retrieves the user's name from local storage and updates the greeting message in the UI.
 * If the user is a guest, a generic greeting is displayed.
 */
async function usersName() {
  fromLocalStorage = JSON.parse(localStorage.getItem("user"));

  const fullName = fromLocalStorage[0].name;

  const greetName = document.getElementById("greet-name");

  if (+fromLocalStorage[0].id === 0) {
    greetName.innerHTML = "Dear Guest";
  } else {
    greetName.innerHTML = fullName;
  }
}
// greet name off

// show all Summary numbers
const loadTasks = async () => {
  await showAllTasksOnSummary("tasks", "tasks-board");
  await showAllTasksOnSummary("inProgress", "tasks-progress");
  await showAllTasksOnSummary("feedback", "awaiting-feedback");
  await showAllTasksUrgent();
  await showAllTasksOnSummary("toDo", "sum-todo");
  await showAllTasksOnSummary("done", "sum-done");
};

/**
 * Retrieves all tasks from local storage and filters them by priority ("up").
 * Updates the specified element on the board summary with the count of filtered tasks.
 */
const showAllTasksUrgent = async () => {
  const getAllTasks = JSON.parse(await getItem("tasks"));
  const filteredTasks = getAllTasks.filter((t) => t.prio === "up");
  const inBoard = document.querySelector("#sum-urgent");
  inBoard.innerHTML = filteredTasks.length;
};

/**
 * Retrieves all items of a specific type from local storage.
 * Updates the specified element on the board summary with the count of retrieved items.
 * @param {string} item - The type of item to retrieve.
 * @param {string} element - The ID of the element to update.
 */
const showAllTasksOnSummary = async (item, element) => {
  const getAllItems = JSON.parse(await getItem(item));
  const inBoard = document.querySelector(`#${element}`);
  inBoard.innerHTML = getAllItems.length;
};
