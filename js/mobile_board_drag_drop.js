/**
 * Handles the event when a list is changed.
 * Moves the task card from one container to another based on the selected status.
 * @param {Event} e - The event object.
 */
const listChanged = async (e) => {
  const containerId = e.target.closest(".board-content-element").dataset.id;
  const taskId = e.target.closest(".board-task-card").id;
  const statusId = e.srcElement.selectedIndex;

  await removeElementFromParent(Number(containerId), Number(taskId));
  await addElementToNewParent(Number(statusId) + 1, Number(taskId));

  await moveElement(containerId, statusId);
};

/**
 * Moves an element from one container to another based on the provided containerId and statusId.
 * @param {number} containerId - The ID of the container from which the element will be moved.
 * @param {number} statusId - The ID of the destination container where the element will be moved.
 */
const moveElement = async (containerId, statusId) => {
  const elementsWithDataId = document.querySelector(
    `[data-id='${containerId}']`
  );
  const elementToMove = elementsWithDataId.querySelector(".board-task-card");
  elementToMove.parentNode.removeChild(elementToMove);

  const moveToContainer = document.querySelector(`[data-id='${statusId + 1}']`);
  const moveToDiv = moveToContainer.querySelector(".drop-area");
  moveToDiv.appendChild(elementToMove);
};
