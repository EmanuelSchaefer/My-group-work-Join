// This function is used to handle URL changes and ensure that a user is logged in.
// It is typically used as a listener for the "hashchange" event or a similar event
// that detects changes in the URL.
const handleUrlChange = (e) => {
  if (!localStorage.getItem("user")) {
    location.replace("index.html");
  }
};

// Add event listener to detect URL changes
window.addEventListener("popstate", handleUrlChange);

// Initial call to handleUrlChange in case the page is loaded with a specific URL
handleUrlChange();
