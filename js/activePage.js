/**
 * Sets the active state for the current page's sidebar button.
 * The function extracts the word from the URL and adds the "sidebarBtnActive" class
 * to the corresponding sidebar button element.
 */
const activePage = async () => {
  let currentPageUrl = window.location.href;

  let lastSlashIndex = currentPageUrl.lastIndexOf("/");

  let word = currentPageUrl.substring(
    lastSlashIndex + 1,
    currentPageUrl.length - 5
  );

  if (word !== "help") {
    const findClass = document.querySelectorAll(`.${word}-sidebar`);

    findClass.forEach((c) => {
      c.classList.add("sidebarBtnActive");
    });
  }
};
