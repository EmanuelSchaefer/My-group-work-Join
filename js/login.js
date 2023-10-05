// The 'loginUser' function is responsible for handling the login process when the user attempts to log in.
// It first hides any existing error messages by calling the 'hideErrorMessages' function.
const loginUser = async () => {
  hideErrorMessages();

  const userExist = await filterUser(email.value, password.value);

  if (userExist.length > 0) {
    const userId = userExist[0].id;
    await filterUserTasks(userId);
    await filterUserContacts(userId);
    location.href = "summary.html";
  } else {
    errorMessage.style.opacity = 1;
    errorMessage.style.animation = "fadeSendMessageIn 1s ease-in-out forwards";

    setTimeout(() => {
      errorMessage.style.animation =
        "fadeSendMessageOut 1s ease-in-out forwards";
    }, 4000);
  }
};

// The 'hideErrorMessages' function is responsible for hiding any error messages related to the login process.
// It sets the focus on the email input field to allow the user to easily start typing without having to click the field.
const hideErrorMessages = () => {
  email.focus();
  errorMessage.style.opacity = 0;
  errorMessage.style.animation = "fadeSendMessageOut 1s ease-in-out forwards";
};

// The 'filterUser' function checks if a user with the provided email and password exists in the 'users' array.
// It retrieves the 'users' array from local storage and parses it as a JSON object.
const filterUser = async (email, password) => {
  let users = JSON.parse(await getItem("users"));

  const userExist = users.filter((user) => {
    if (user.email === email && user.password === password) {
      localStorage.setItem("user", JSON.stringify([user]));
      return user;
    }
  });

  return userExist;
};

// The 'filterUserTasks' function filters tasks based on the provided user ID and stores the filtered tasks in local storage.
// It retrieves the 'tasks' array from local storage and parses it as a JSON object.
const filterUserTasks = async (id) => {
  let tasks = JSON.parse(await getItem("tasks"));

  tasks.filter((task) => {
    if (task.ownerId === id) {
      localStorage.setItem("userTasks", JSON.stringify([task]));
      return task;
    }
  });
};

// The 'filterUserContacts' function filters contacts based on the provided user ID and stores the filtered contacts in local storage.
// It retrieves the 'contacts' array from local storage and parses it as a JSON object.
const filterUserContacts = async (id) => {
  let contacts = JSON.parse(await getItem("contacts"));

  contacts.filter((contact) => {
    if (contact.ownerId === id) {
      localStorage.setItem("userContacts", JSON.stringify([contact]));
      return contact;
    }
  });
};
