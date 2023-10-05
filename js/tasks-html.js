/**
 * Generates a template HTML for the category list dropdown.
 * @returns {string} The generated HTML.
 */
function categoryListHTML() {
  return `
    <div class="dropdown-object" onclick="renderNewCategoryField()">
    <div id="newCategory">New category</div>  
    </div>


    <div class="dropdown-object" onclick="saveSelectedCategory(this, '${"red"}')">
    <div class="flex-row">
        <span>Backoffice</span>
        <div class="category-color margin-left-10" style="background-color: red" id="backofficeField"></div>
    </div>
    </div>

    <div class="dropdown-object" onclick="saveSelectedCategory(this, '${"pink"}')">
    <div class="flex-row">
        <span>Sales</span>
        <div class="category-color margin-left-10" style="background-color: pink"></div>
    </div>
    </div>
    `;
}

/**
 * Generates a template HTML for a category field.
 * Includes an input field for entering a new category, buttons, and event handlers.
 * @returns {string} The generated HTML.
 */
function categoryFieldHTML() {
  return `
    <div class="flex-row space-between align-center">
    <input placeholder="Enter new category" id="new-category" class="category-input" onclick="stopDropdown(event)">

        <div class="flex-row align-center height-100">
        <img src="./assets/img/close.svg" onclick="clearSelections()">

        <div class="vert-border"></div>
        <button class="newCategory" onclick="checkNewCategory(); stopDropdown(event);" type="button"><img
        src="assets/img/check.svg"></button>
        </div>
    </div>
    `;
}

/**
 * Generates a template HTML for a normal category field.
 * Includes a text indicating to select a category and an arrow-down icon.
 * @returns {string} The generated HTML.
 */
function normalCategoryFiledHTML() {
  return `
    <div class="select-cat">
        <span>Select category</span>
        <img src="./assets/img/arrow_down_black.svg" alt="" />
    </div>
    `;
}

/**
 * Generates a template HTML for a category list.
 * Includes dropdown objects for each category with dynamic variables and event handlers.
 * @returns {string} The generated HTML.
 */
function categoryListHTML() {
  let categoryList = `
        <div class="dropdown-object" onclick="renderNewCategoryField()">
        <div id="newCategory">New category</div>  
        </div>
    `;

  for (let i = 0; i < categories.length; i++) {
    const categoryName = categories[i].name;
    const categoryColor = categories[i].color;

    categoryList += `
        <div class="dropdown-object" onclick="saveSelectedCategory(this, '${categoryColor}')">
            <div class="flex-row">
            <span>${categoryName}</span>
            <div class="category-color margin-left-10" style="background-color: ${categoryColor}"></div>
            </div>
        </div>
        `;
  }

  return categoryList;
}

/**
 * Generates a template HTML for rendering a new category input field.
 * Includes input field, buttons, and event handlers.
 * @returns {string} The generated HTML.
 */
function renderNewCategoryHTML() {
  return `
    <div class="flex-row space-between align-center">
    <input placeholder="Enter new category" id="new-category" class="category-input" onclick="stopDropdown(event)">

        <div class="flex-row align-center height-100">
        <img src="./assets/img/close.svg" onclick="clearSelections()">

        <div class="vert-border"></div>
        <button class="newCategory" onclick="checkNewCategory(); stopDropdown(event);" type="button"><img
        src="assets/img/check.svg"></button>
        </div>
    </div>
    `;
}
