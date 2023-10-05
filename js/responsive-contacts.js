/**
 * Handles responsiveness-related tasks.
 * Calls other functions to adjust the layout based on the screen size.
 */
const responsive = () => {
  contactsListMobile();
  checkImg();
};

// Add an event listener for the "resize" event on the window object
window.addEventListener(
  "resize",
  (e) => {
    const activeContact = document.querySelector(".contact-user-active");
    if (activeContact) {
      renderContact(activeContact.id);
    }
    contactsListMobile();
    checkImg();
  },
  true
);

/**
 * Adjusts the image sources based on the window width.
 */
const checkImg = () => {
  const addFormCloseImg = document.querySelector(".add-form-close-img");
  const editFormCloseImg = document.querySelector(".edit-form-close-img");

  if (window.innerWidth <= 700) {
    addFormCloseImg.src = "./assets/img/close-white.svg";
    editFormCloseImg.src = "./assets/img/close-white.svg";
  } else {
    addFormCloseImg.src = "./assets/img/close.svg";
    editFormCloseImg.src = "./assets/img/close.svg";
  }
};

/**
 * Adjusts the layout of the contacts list for mobile or larger screens.
 */
const contactsListMobile = () => {
  if (window.innerWidth <= 700) {
    contactsContainer.style.position = "absolute";
    contactsContainer.style.top = "17rem";
    contactsList.style.display = "";
    newContact.style.display = "flex";

    crudContacts.style.display = "none";
  } else {
    contactsContainer.style.top = "8rem";
    crudContacts.style.display = "flex";
  }
};
