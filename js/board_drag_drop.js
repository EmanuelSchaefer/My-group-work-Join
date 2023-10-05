// Elemente auswählen
let draggableElement;
let containers;
let dragStartParentId;

// Dragstart Event-Handler
function dragStart(event) {
  // Speichern des referenzierten Elements
  draggableElement = event.target;
  // Speichern der ID des ursprünglichen Containers
  event.dataTransfer.setData("text/plain", event.target.parentNode.id);

  // Add the highlight class to the valid drop target containers
  containers.forEach((container) => {
    if (
      container !== event.target.parentNode &&
      container.classList.contains("valid-container")
    ) {
      container.classList.add("highlight");
    }
  });

  dragStartParentId = event.currentTarget.parentNode.dataset.id;
}

// Dragend Event-Handler
function dragEnd(event) {
  // Remove the highlight class from all containers
  containers.forEach((container) => {
    container.classList.remove("highlight");
  });
}

// Dragover Event-Handler
function dragOver(event) {
  event.preventDefault();
}

// Drop Event-Handler
function drop(event) {
  event.preventDefault();
  const originalContainerId = event.dataTransfer.getData("text/plain");
  const currentContainer = event.target;

  if (currentContainer.classList.contains("valid-container")) {
    currentContainer.appendChild(draggableElement);
  } else {
    const originalContainer = document.getElementById(originalContainerId);
    originalContainer.appendChild(draggableElement);
  }

  // Remove the highlight class from all containers after dropping
  containers.forEach((container) => {
    container.classList.remove("highlight");
  });

  // Call the function to log the dragged element ID and the parent ID where it is dropped
  logElementDrop(
    dragStartParentId,
    draggableElement.id,
    currentContainer.parentNode.dataset.id
  );
}

// Function to log the dragged element ID and the parent ID where it is dropped
function logElementDrop(dragStartParentId, elementId, parentId) {
  removeElementFromParent(dragStartParentId, elementId);
  addElementToNewParent(parentId, elementId);
}

async function addElementToNewParent(parentId, elementId) {
  let parentName = parentId - 1;

  const status = ["toDo", "inProgress", "feedback", "done"];

  switch (true) {
    case status[parentName] === "toDo":
      toDo.push(+elementId);
      await setItem("toDo", JSON.stringify(toDo));
      break;
    case status[parentName] === "inProgress":
      inProgress.push(+elementId);
      await setItem("inProgress", JSON.stringify(inProgress));
      break;
    case status[parentName] === "feedback":
      feedback.push(+elementId);
      await setItem("feedback", JSON.stringify(feedback));
      break;
    case status[parentName] === "done":
      done.push(+elementId);
      await setItem("done", JSON.stringify(done));

      break;
    default:
      console.log("Error");
      break;
  }
}

async function removeElementFromParent(dragStartParentId, elementId) {
  let parentName = dragStartParentId - 1;

  const status = ["toDo", "inProgress", "feedback", "done"];

  switch (true) {
    case status[parentName] === "toDo":
      const filteredTodo = toDo.filter((t) => {
        if (t !== +elementId) {
          return t;
        }
      });
      toDo = filteredTodo;
      await setItem("toDo", JSON.stringify(toDo));
      break;
    case status[parentName] === "inProgress":
      const filteredInProgress = inProgress.filter((t) => {
        if (t !== +elementId) {
          return t;
        }
      });
      inProgress = filteredInProgress;
      await setItem("inProgress", JSON.stringify(inProgress));
      break;
    case status[parentName] === "feedback":
      const filteredFeedback = feedback.filter((t) => {
        if (t !== +elementId) {
          return t;
        }
      });
      feedback = filteredFeedback;
      await setItem("feedback", JSON.stringify(feedback));
      break;
    case status[parentName] === "done":
      const filteredDone = done.filter((t) => {
        if (t !== +elementId) {
          return t;
        }
      });
      done = filteredDone;
      await setItem("done", JSON.stringify(done));

      break;
    default:
      console.log("Error");
      break;
  }
}

setTimeout(() => {
  draggableElement = document.querySelector(".draggable");
  containers = document.querySelectorAll(".container");

  // Eventlistener für Dragstart hinzufügen
  containers.forEach((container) => {
    container.addEventListener("dragstart", dragStart);
  });

  // Eventlistener für Dragend hinzufügen
  draggableElement?.addEventListener("dragend", dragEnd);

  // Eventlistener für Dragover und Drop hinzufügen
  containers.forEach((container) => {
    container.addEventListener("dragover", dragOver);
    container.addEventListener("drop", drop);
  });
}, 1000);
