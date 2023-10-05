// The 'users' variable is an array that will store user data loaded from the application's local storage.
let users = [];

// The 'init' function is the entry point of the application.
// It calls the 'loadUsers' function to fetch user data from local storage and initialize the 'users' array.
const init = () => {
  loadUsers();
};

// The 'loadUsers' function is responsible for fetching user data from the local storage.
// It parses the JSON data obtained from local storage and stores it in the 'users' array.
const loadUsers = async () => {
  users = JSON.parse(await getItem("users"));
};
