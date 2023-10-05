// This function is used to handle guest login. It takes the 'id' parameter, which may be used to identify the guest user.
const guestLoginNow = async (id) => {
  await filterGuest(id);
  await filterGuestTasks(id);
  await filterGuestContacts(id);

  location.replace("summary.html");
};

// This function is used to filter and store the guest user's information in the local storage. It takes an 'id' parameter.
const filterGuest = async (id) => {
  let allUsers = JSON.parse(await getItem("users"));

  const guestUser = allUsers.filter((user) => {
    if (+user.id === id) {
      return user;
    }
  });

  localStorage.setItem("user", JSON.stringify(guestUser));
};

// This function is used to filter and store the tasks associated with the guest user in the local storage. It takes an 'id' parameter.
const filterGuestTasks = async (id) => {
  let allTasks = JSON.parse(await getItem("tasks"));

  const userTasks = allTasks.filter((task) => {
    if (+task.ownerId === id) {
      return task;
    }
  });

  localStorage.setItem("userTasks", JSON.stringify(userTasks));
};

// This function is used to filter and store the contacts associated with the guest user in the local storage. It takes an 'id' parameter.
const filterGuestContacts = async (id) => {
  let allContacts = JSON.parse(await getItem("contacts"));

  const userContacts = allContacts.filter((contact) => {
    if (+contact.ownerId === id) {
      return contact;
    }
  });

  localStorage.setItem("userContacts", JSON.stringify(userContacts));
};
