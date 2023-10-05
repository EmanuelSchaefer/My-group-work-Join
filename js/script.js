// The function indexSelectedElements() likely returns the selected elements in the DOM
const [
  login,
  errorMessage,
  email,
  password,
  checkBox,
  signUp,
  signUpContainer,
  forgotPassword,
  resetPassword,
  forgotPasswordInput,
  accountExist,
  passwordFailed,
  signupName,
  signupEmail,
  signupPassword,
  confirmPassword,
  confirmMessage,
  newPassword,
  successfullyRegistered,
  sentConfirmationMessage,
] = indexSelectedElements();

if (window.innerWidth <= 700) {
  signUpContainer.style.marginBottom = "4rem";
  if (window.innerHeight <= 667) {
    document.body.style.height = "900px";
    login.style.top = "50%";
  } else if (window.innerHeight <= 740) {
    login.style.top = "62%";
  } else if (window.innerHeight <= 815) {
    login.style.top = "60%";
  } else if (window.innerHeight <= 915) {
    login.style.top = "55%";
  }
}

let userInputEmailAddress = "";

// This function is used to display the sign-up form and hide all other containers in the user interface.
// It is typically called when the user clicks on the "Sign Up" link or button to switch to the registration screen.
const registerScreen = () => {
  if (window.innerWidth <= 700) {
    login.style.display = "none";
    signUp.style.display = "flex";
    signUp.style.animation = "forgotPasswordIn 1s ease-in-out forwards";
  }
  hideAllContainers();

  errorMessage.style.opacity = 0;
  errorMessage.style.animation = "fadeSendMessageOut 1s ease-in-out forwards";

  signUp.style.display = "flex";
  signUpContainer.style.display = "none";
};

// This function hides all other containers and displays both the login form container and the sign-up container.
const backToLoginPage = () => {
  hideAllContainers();
  signUpContainer.style.display = "flex";
  login.style.display = "flex";
};

// This function hides all containers with the class "login-container".
const hideAllContainers = () => {
  const loginContainer = document.querySelectorAll(".login-container");
  loginContainer.forEach((element) => {
    element.style.display = "none";
  });
};

// This function displays the "forgot password" screen by hiding all other containers and showing the "forgotPassword" container.
const forgotScreen = () => {
  if (window.innerWidth <= 700) {
    login.style.display = "none";
    forgotPassword.style.display = "flex";
    forgotPassword.style.animation = "forgotPasswordIn 1s ease-in-out forwards";
  }
  hideAllContainers();
  forgotPassword.style.display = "flex";
  signUpContainer.style.display = "none";
};

// This function simulates sending a password reset link to the user in a real application.
// In this project, it directly opens the password reset screen to allow the user to reset their password immediately.
const sendEmail = () => {
  userInputEmailAddress = forgotPasswordInput.value;

  if (window.innerWidth <= 700) {
    forgotPassword.style.display = "none";
    sentConfirmationMessage.style.display = "flex";
    sentConfirmationMessage.style.animation =
      "fadeSendMessageIn 600ms ease-in-out forwards";
    resetPassword.style.animation = "forgotPasswordIn 1s ease-in-out forwards";
  } else {
    forgotPassword.style.display = "none";
    sentConfirmationMessage.style.animation =
      "fadeSendMessageIn 600ms ease-in-out forwards";
  }
  forgotPasswordInput.value = "";
  setTimeout(() => {
    resetPassword.style.display = "flex";
    sentConfirmationMessage.style.animation =
      "fadeSendMessageOut 1s ease-in-out forwards";
  }, 1500);
};

// This function handles the user's attempt to reset their password.
const userResetPassword = async () => {
  if (newPassword.value === confirmPassword.value) {
    const users = await findUser(newPassword);

    await setItem("users", JSON.stringify(users));

    confirmMessage.style.animation =
      "fadeSendMessageIn 600ms ease-in-out forwards";
    passwordSuccessReset();
  } else {
    passwordResetFailed();
  }
};

// Async function that finds a user by their email address and updates their password
const findUser = async (newPassword) => {
  const users = JSON.parse(await getItem("users"));

  const newUsers = users.filter((user) => {
    if (user.email === userInputEmailAddress) {
      return (user.password = newPassword.value);
    }
    return user;
  });

  return newUsers;
};

// This function displays a message to inform the user that the password reset has failed.
const passwordResetFailed = () => {
  passwordFailed.style.animation =
    "fadeSendMessageIn 600ms ease-in-out forwards";

  setTimeout(() => {
    passwordFailed.style.animation =
      "fadeSendMessageOut 2s ease-in-out forwards";
  }, 1000);
};

// This function handles the UI behavior when the user successfully resets their password.
const passwordSuccessReset = () => {
  setTimeout(() => {
    resetPassword.style.display = "none";
  }, 1000);

  setTimeout(() => {
    confirmMessage.style.animation =
      "fadeSendMessageOut 1s ease-in-out forwards";
    location.replace("index.html");
  }, 2000);
};

// This function handles URL changes in the application.
const handleUrlChange = (e) => {
  if (localStorage.getItem("user")) {
    location.replace("summary.html");
  }
};

// Add event listener to detect URL changes
window.addEventListener("popstate", handleUrlChange);

// Initial call to handleUrlChange in case the page is loaded with a specific URL
handleUrlChange();
