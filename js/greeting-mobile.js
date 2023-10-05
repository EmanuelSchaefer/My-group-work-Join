const mobileGreeting = document.querySelector(".first-mobile-greeting");
const summaryDesktop = document.querySelector(".on-top");

async function mobile() {
  document.getElementById("mobileTextgreeting").innerText =
    await alldayGreeting();
  await mobileUsersName();
  await greetSummaryAnimation();
}

// Greeting as animation for mobile

async function greetSummaryAnimation() {
  if (window.innerWidth >= 1000) {
    mobileGreeting.style.display = "none";
    summaryDesktop.style.display = "flex";
  } else if (window.innerWidth <= 1000) {
    mobileGreeting.style.display = "flex";
    summaryDesktop.style.display = "none";

    setTimeout(() => {
      mobileGreeting.style.animation =
        "fadeOutGreeting 1s ease-in-out forwards";
      mobileGreeting.style.display = "none";

      summaryDesktop.style.animation = "fadeInGreeting 1s ease-in-out forwards";
      summaryDesktop.style.display = "flex";
    }, 2000);
  }
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

async function mobileUsersName() {
  localstorage = JSON.parse(localStorage.getItem("user"));

  const fullName = localstorage[0].name;

  const greetmobileName = document.getElementById("mobileNamegreeting");

  if (+localstorage[0].id === 0) {
    greetmobileName.innerHTML = "Dear Guest";
  } else {
    greetmobileName.innerHTML = fullName;
  }
}
