/**
 * Handles responsiveness-related tasks, including animations and element adjustments.
 */
const responsive = () => {
  const body = document.querySelector("body");
  const joinStartImg = document.querySelector("#join-start-img-responsive");
  const signUpContainer = document.querySelector("#sign-up-container");
  const loginContainer = document.querySelector("#login-container");

  setTimeout(() => {
    body.style.animation = "changeBcg 1s ease-in-out forwards";
    joinStartImg.style.animation = "changeImg 1s linear forwards";
    signUpContainer.style.animation =
      "fadeInContainers 1s ease-in-out forwards";
    loginContainer.style.animation = "fadeInContainers 1s ease-in-out forwards";
  }, 2000);

  setTimeout(() => {
    loginContainer.style.display = "flex";
    signUpContainer.style.display = "flex";
  }, 500);
};
