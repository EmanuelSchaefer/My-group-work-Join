// This function is used to generate a template for contacts
const renderContactsList = (
  count,
  colors,
  firstNameLetter,
  firstLastLetter,
  user
) => {
  return `
    <div id="${count}" onclick="renderContact(${count})" class="contact-user contact-user-${count}">
        <div style="background-color: ${colors[count]}" class="contact-user-init">
            <p>${firstNameLetter}</p>
            <p>${firstLastLetter}</p>
        </div>
        <div class="contact-info">
            <p class="contact-info-name">${user.fullName}</p>
            <p class="contact-info-email">${user.email}</p>
        </div>
    </div>
    `;
};

// This function is used to generate a template for render one specific contact
const userContactPreview = (
  colors,
  id,
  firstNameLetter,
  firstLastLetter,
  users
) => {
  return `
    <div class="user-contact">
      <div style="background-color: ${colors[id]}" class="user-contact-init">
          <p>${firstNameLetter}</p>
          <p>${firstLastLetter}</p>
      </div>
  
      <div class="user-contact-info">
          <p class="user-contact-info-name">${users[id].fullName}</p>
          <div onclick="openAddTaskPopup('toDo'); initTasks()" class="user-contact-add-task">
              <img class="user-contact-add-task-img" src="./assets/img/add-task-blue.svg" alt="Add task image" />
          </div>
      </div>
    </div>
  
    <div class="contact-information">
        <div class="contact-information-header">
          <p>Contact Information</p>
        </div>
        
        <div onclick="editContact(${id})" class="edit-contact">
          <img class="edit-contact-img" src="./assets/img/edit-contact-black.svg" alt="Pencil" />
        </div>
    </div>
  
    <div class="contact-email-phone">
        <div class="contact-email">
            <p class="contact-email-header">Email</p>
            <p class="contact-email-address">${users[id].email}</p>
        </div>
        <div class="contact-phone">
            <p class="contact-phone-header">Phone</p>
            <p class="contact-phone-number">${users[id].phone}</p>
        </div>
    </div>
    `;
};

// This function is used to generate a template for render one specific contact
const userContactPreviewMobile = (
  colors,
  id,
  firstNameLetter,
  firstLastLetter,
  users
) => {
  return `
    <div class="user-contact-preview-info-mobile">
      <p>Kanban Project Management Tool</p>  
    </div>

    <div class="user-contact-preview-title-mobile">
      <p>Contacts</p>
      <img onclick="contactsListMobile()" class="user-contact-preview-title-img-mobile" src="./assets/img/arrow-left-line.svg" alt="Arrow left image" />
    </div>

    <div class="user-contact-preview-title-team-mobile">
      <p>Better with a team</p>
    </div>

    <div class="user-contact-preview-title-divider-mobile"></div>
    

    <div id="user-info-container">
      <div class="user-contact-mobile">
        <div style="background-color: ${colors[id]}" class="user-contact-init-mobile">
            <p>${firstNameLetter}</p>
            <p>${firstLastLetter}</p>
        </div>
    
        <div class="user-contact-info-mobile">
            <p class="user-contact-info-name-mobile">${users[id].fullName}</p>
            <div onclick="openAddTaskPopup('toDo');initTasks();" class="user-contact-add-task-mobile">
                <img class="user-contact-add-task-img-mobile" src="./assets/img/add-task-blue.svg" alt="Add task image" />
            </div>
        </div>
      </div>
    
      <div class="contact-information-mobile">
          <div class="contact-information-header-mobile">
            <p>Contact Information</p>
          </div>
      </div>
    
      <div class="contact-email-phone-mobile">
          <div class="contact-email-mobile">
              <p class="contact-email-header-mobile">Email</p>
              <p class="contact-email-address-mobile">${users[id].email}</p>
          </div>
          <div class="contact-phone-mobile">
              <p class="contact-phone-header-mobile">Phone</p>
              <p class="contact-phone-number-mobile">${users[id].phone}</p>
          </div>
      </div>
    </div>

   
        <div onclick="deleteContact(${id})" class="contact-crud-options-delete">
          <img src="./assets/img/delete.svg" alt="Delete img"/> 
        </div>
        <div onclick="editContact(${id})" class="contact-crud-options-edit">
        <img src="./assets/img/pencil-blue.svg" alt="Edit img"/> 
        </div>
   
    `;
};
