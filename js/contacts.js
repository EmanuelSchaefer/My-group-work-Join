// The function contactsSelectedElements() likely returns the selected elements in the DOM
const [
  body,
  contactBody,
  addContact,
  editUserContact,
  editFormUserImg,
  editInputName,
  editInputEmail,
  editInputPhone,
  editButtonsCancel,
  editButtonsCreate,
  renderAllContacts,
  contactContainer,
  newContact,
  contactExist,
  contactsList,
  crudContacts,
  contactsContainer,
] = contactsSelectedElements();

// Count for colors
let count = 0;

// Colors for avatar
const colors = colorsMix();

// JSON data from Database
const data = localStorage.getItem("userContacts");
const jsonData = JSON.parse(data);
let userContacts = jsonData[0]?.contacts;

// Create an object to hold the grouped names
let groupedNames = [];

// Reset array and count
const resetToStart = () => {
  groupedNames = [];
  count = 0;
};

// Sort the array alphabetically by the fullName property
const sortArray = () => {
  userContacts.sort((a, b) => a.fullName.localeCompare(b.fullName));
};

// Group the names by their starting letters
const groupNames = () => {
  userContacts.forEach((user) => {
    const firstLetter = user.fullName.charAt(0).toUpperCase();
    if (!groupedNames[firstLetter]) {
      groupedNames[firstLetter] = [];
    }
    groupedNames[firstLetter].push(user);
  });
};

// This function takes a 'user' object as input and splits the full name into first name and last name initials.
const splitNameLastName = (user) => {
  const firstLetter = user.fullName.split(" ")[0].charAt(0);
  const lastLetter = user.fullName.split(" ")[1].charAt(0);

  return [firstLetter, lastLetter];
};

// This function increments the 'count' variable by 1 if it is less than 19,
// otherwise, it resets the 'count' variable to 0.
const countStart = () => {
  if (count < 19) {
    count++;
  } else {
    count = 0;
  }
};

// Generate and render the HTML
const renderHTML = () => {
  resetToStart();
  sortArray();
  groupNames();

  // Generate the HTML output
  let htmlOutput = "";

  for (const letter in groupedNames) {
    htmlOutput += `<h2 class="contact-letter">${letter}</h2>`;
    htmlOutput += `<div class="contact-divider"></div>`;

    groupedNames[letter].forEach((user) => {
      const [firstLetter, lastLetter] = splitNameLastName(user);

      htmlOutput += renderContactsList(
        count,
        colors,
        firstLetter,
        lastLetter,
        user
      );
      countStart();
    });
  }

  // Display the HTML output
  renderAllContacts.innerHTML = htmlOutput;
};

// Generate and render the contacts
const renderContact = (id) => {
  clearActiveState();
  toggleActiveState(id);
  const [firstLetter, lastLetter] = splitNameLastName(userContacts[id]);

  if (window.innerWidth <= 700) {
    contactsList.style.display = "none";
    crudContacts.style.display = "flex";
    contactsContainer.style.position = "relative";
    contactsContainer.style.top = "8rem";
    newContact.style.display = "none";

    contactContainer.innerHTML = "";

    let html = userContactPreviewMobile(
      colors,
      id,
      firstLetter,
      lastLetter,
      userContacts
    );

    setTimeout(() => {
      contactContainer.innerHTML = html;
      editContactHover();
      userContactHover();
    }, 100);
  } else {
    contactContainer.style.animation =
      "fadeOutContact 50ms ease-in-out forwards";
    contactContainer.innerHTML = "";

    let html = userContactPreview(
      colors,
      id,
      firstLetter,
      lastLetter,
      userContacts
    );

    setTimeout(() => {
      if (window.innerWidth <= 700) {
        contactContainer.style.animation =
          "fadeInContactMobile 1s ease-in-out forwards";
      } else {
        contactContainer.style.animation =
          "fadeInContact 1s ease-in-out forwards";
      }
      contactContainer.innerHTML = html;
      editContactHover();
      userContactHover();
    }, 100);
  }
};

// This function is used to clear the active state from contact-user elements.
const clearActiveState = () => {
  const contactUser = document.querySelectorAll(".contact-user-active");
  contactUser.forEach((a) => {
    a.classList.remove("contact-user-active");
    a.classList.add("contact-user");
  });
};

// This function is used to toggle the active state of a specific contact-user element based on its 'id'.
const toggleActiveState = (id) => {
  const contactUser = document.querySelector(`.contact-user-${id}`);

  contactUser.classList.add("contact-user-active");
  contactUser.classList.remove("contact-user");
};

// This function is used to handle the hover effect for the "edit contact" image.
const editContactHover = () => {
  const editContactImg = document.querySelector(".edit-contact-img");
  if (editContactImg) {
    editContactImg.addEventListener("mouseover", () => {
      editContactImg.src = "./assets/img/edit-contact-blue.svg";
    });

    editContactImg.addEventListener("mouseout", () => {
      editContactImg.src = "./assets/img/edit-contact-black.svg";
    });
  }
};

// This function is used to handle the hover effect for the "user contact add task" image.
const userContactHover = () => {
  const userContactAddTaskImg = document.querySelector(
    ".user-contact-add-task-img"
  );

  if (userContactAddTaskImg) {
    userContactAddTaskImg.addEventListener("mouseover", () => {
      userContactAddTaskImg.src = "./assets/img/add-task-blue-bold.svg";
    });

    userContactAddTaskImg.addEventListener("mouseout", () => {
      userContactAddTaskImg.src = "./assets/img/add-task-blue.svg";
    });
  }
};

// This function is used to open the "add contact" section by changing CSS properties and calling the "animateToggle" function.
const openAddContact = () => {
  contactExist.style.opacity = 0;
  contactBody.style.opacity = 0.2;
  contactBody.style.zIndex = -1;
  animateToggle("fadeIn", addContact);
  addContact.style.opacity = 1;
  addContact.style.zIndex = 5;
};

// This function is used to close the "add contact" section by changing CSS properties and calling the "animateToggle" function.
const closeAddContact = () => {
  contactBody.style.opacity = 1;
  contactBody.style.zIndex = 1;
  animateToggle("fadeOut", addContact);
  setTimeout(() => {
    addContact.style.animation = "";
    addContact.style.opacity = 0;
    addContact.style.zIndex = -9999;
  }, 1000);
};

// This function is used to close the "edit contact" section by changing CSS properties and calling the "animateToggle" function.
const closeEditContact = () => {
  contactBody.style.opacity = 1;
  contactBody.style.zIndex = 1;
  animateToggle("fadeOut", editUserContact);
  setTimeout(() => {
    editUserContact.style.animation = "";
    editUserContact.style.opacity = 0;
    editUserContact.style.zIndex = -9999;
  }, 1000);
};

// This function is used to edit a specific contact with the provided 'id'.
const editContact = (id) => {
  contactBody.style.opacity = 0.3;
  contactBody.style.zIndex = -1;
  animateToggle("fadeIn", editUserContact);
  editUserContact.style.opacity = 1;

  const { email, fullName, phone } = userContacts[id];

  editInputName.value = fullName;
  editInputEmail.value = email;
  editInputPhone.value = phone;

  createLetterAvatar(id);
  myButtonEvents(id);
};

// This function is used to apply fadeIn or fadeOut animations to the specified 'element'.
const animateToggle = (stringFade, element) => {
  if (stringFade === "fadeIn") {
    element.style.animation = "addFadeIn 1s ease-in-out forwards";
  } else {
    element.style.animation = "addFadeOut 1s ease-in-out forwards";
  }
};

// This function is used to create a letter-based avatar for the contact with the provided 'id'.
const createLetterAvatar = (id) => {
  const [firstLetter, lastLetter] = splitNameLastName(userContacts[id]);
  editFormUserImg.innerHTML = `<p>${firstLetter}</p> <p>${lastLetter}</p>`;
  editFormUserImg.style.backgroundColor = colors[id];
};

// This function is used to set specific events for the edit buttons, based on the provided 'id'.
const myButtonEvents = (id) => {
  editButtonsCancel.setAttribute("onclick", `deleteContact(${id})`);
  editButtonsCreate.setAttribute(
    "onsubmit",
    `saveEditedContact(${id}); return false;`
  );
};

// This function is used to delete a contact with the provided 'id'.
const deleteContact = async (id) => {
  const user = userContacts[id];

  const userId = JSON.parse(localStorage.getItem("userContacts"));
  const allContacts = JSON.parse(await getItem("contacts"));

  const filterContacts = userContacts.filter((u) => {
    if (u.email !== user.email) {
      return u;
    }
  });

  const newUser = { ownerId: userId[0].ownerId, contacts: filterContacts };

  const filterAllContacts = await allContacts.map((i) => {
    if (i.ownerId === userId[0].ownerId) {
      i = newUser;
      console.log(i);
      return i;
    }
    return i;
  });

  await setItem("contacts", JSON.stringify(filterAllContacts));
  localStorage.setItem("userContacts", JSON.stringify([newUser]));

  userContacts = filterContacts;
  contactContainer.innerHTML = "";
  renderAllContacts.innerHTML = "";
  closeEditContact();
  renderHTML();
  contactsListMobile();
};

// This function is used to save the edited contact with the provided 'id'.
const saveEditedContact = async (id) => {
  const user = userContacts[id];

  const userFiltered = await filterTheUsers(user);

  const userId = JSON.parse(localStorage.getItem("userContacts"));

  const newUserObject = [
    { ownerId: userId[0].ownerId, contacts: userFiltered },
  ];

  await setItem("contacts", JSON.stringify(newUserObject));
  localStorage.setItem("userContacts", JSON.stringify(newUserObject));

  renderAllContacts.innerHTML = "";
  closeEditContact();
  renderHTML();
  const index = userContacts.findIndex((o) => o.email === user.email);
  renderContact(id);
};

// This function is used to filter the user and update the current user
const filterTheUsers = async (user) => {
  const [name, email, phone] = inputFields();

  const filterUser = await userContacts.map((r) => {
    if (user.email === r.email) {
      r.fullName = name.value;
      r.email = email.value;
      r.phone = phone.value;
      return r;
    }
    return r;
  });

  return filterUser;
};

// This function is used to select the input fields
const inputFields = () => {
  const name = document.querySelector("#edit-input-name");
  const email = document.querySelector("#edit-input-email");
  const phone = document.querySelector("#edit-input-phone");

  return [name, email, phone];
};

// This function is used to create new Contact
const createContact = async () => {
  const [addFormNameInput, addFormEmailInput, addFormPhoneInput] =
    formInputFields();

  const capitalizeWord = (word) =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

  const name = addFormNameInput.value.split(" ");

  const firstName = capitalizeWord(name[0]);
  const lastName = capitalizeWord(name[1]);

  let allContacts = JSON.parse(await getItem("contacts"));
  const id = JSON.parse(localStorage.getItem("user"))[0].id;

  const create = async () => {
    const newUser = {
      fullName: `${firstName} ${lastName}`,
      email: addFormEmailInput.value.toLowerCase(),
      phone: addFormPhoneInput.value,
    };

    let filterUserContacts = allContacts.filter((contact) => {
      if (contact.ownerId === id) {
        return contact;
      }
    });

    filterUserContacts[0].contacts = [
      ...filterUserContacts[0].contacts,
      newUser,
    ];

    const updateContacts = allContacts.filter((c) => {
      if (c.ownerId === id) {
        return filterUserContacts;
      }
      return c;
    });

    await setItem("contacts", JSON.stringify(updateContacts));
    localStorage.setItem("userContacts", JSON.stringify(filterUserContacts));

    userContacts = filterUserContacts[0].contacts;

    clearInputsInnerHtml(
      addFormNameInput,
      addFormEmailInput,
      addFormPhoneInput
    );
    closeAddContact();
    renderHTML();
    const index = userContacts.findIndex((o) => o.email === newUser.email);
    renderContact(index);
  };

  const usersContacts = allContacts.filter((contact) => {
    if (contact.ownerId === id) {
      return contact;
    }
  });

  const emailExist = usersContacts[0].contacts.filter(
    (a) => a.email === addFormEmailInput.value
  );

  if (emailExist.length < 1) {
    create();
    contactExist.style.opacity = 0;
  } else {
    contactExist.style.opacity = 1;
  }
};

// This function is used to clear the input fields
const clearInputsInnerHtml = (name, email, phone) => {
  renderAllContacts.innerHTML = "";
  name.value = "";
  email.value = "";
  phone.value = "";
};

// This function is used to select the input fields
const formInputFields = () => {
  const addFormNameInput = document.querySelector("#add-form-name-input");
  const addFormEmailInput = document.querySelector("#add-form-email-input");
  const addFormPhoneInput = document.querySelector("#add-form-phone-input");

  return [addFormNameInput, addFormEmailInput, addFormPhoneInput];
};

// This function is used to start the render th HTML if the data is in the array
if (jsonData.length > 0) {
  renderHTML();
}
