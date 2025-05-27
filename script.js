const notesContainer = document.getElementById("notes-container");
const createBtn = document.querySelector(".add-notes");
const searchBar = document.getElementById("search-bar");

// Color palette
const colorPalette = ["#BDE0FE", "#E7C6FF", "#C8B6FF", "#B8C0FF", "#BBD0FF"];

function showNotes() {
  try {
    const notesapp =
      localStorage.getItem("notesapp") ||
      '<div class="empty-message">No notes yet. Click "New Note" to get started.</div>';
    notesContainer.innerHTML = notesapp;
    applyDragAndDrop();
    document.querySelectorAll(".note").forEach((note) => {
      setupColorPicker(note);
    });
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    notesContainer.innerHTML =
      '<div class="empty-message">Error loading notes. Please try again.</div>';
  }
}

function updateStorage() {
  try {
    if (notesContainer.querySelectorAll(".note").length > 0) {
      localStorage.setItem("notesapp", notesContainer.innerHTML);
    } else {
      localStorage.setItem(
        "notesapp",
        '<div class="empty-message">No notes yet. Click "New Note" to get started.</div>'
      );
    }
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

// function getCurrentTime() {
//   const now = new Date();
//   return now.toLocaleString();
// }

function getCurrentTime() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// Function to set up the color picker for a note
function setupColorPicker(note) {
  const colorPickerBtn = note.querySelector(".color-picker");
  const colorOptions = note.querySelector(".color-options");

  if (colorPickerBtn && colorOptions) {
    colorPickerBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      // Toggle the color options dropdown
      colorOptions.classList.toggle("active");
    });

    // Add event listeners to each color option
    colorOptions.querySelectorAll(".color-option").forEach((option) => {
      option.addEventListener("click", (e) => {
        e.stopPropagation();
        const selectedColor = option.getAttribute("data-color");
        note.style.backgroundColor = selectedColor;
        colorOptions.classList.remove("active");
        updateStorage();
      });
    });
  }

  document.addEventListener("click", (e) => {
    if (
      !colorPickerBtn.contains(e.target) &&
      !colorOptions.contains(e.target)
    ) {
      colorOptions.classList.remove("active");
    }
  });
}

createBtn.addEventListener("click", () => {
  let noteDiv = document.createElement("div");
  noteDiv.className = "note";
  noteDiv.setAttribute("draggable", "true");

  let noteHeader = document.createElement("div");
  noteHeader.className = "note-header";

  let titleInput = document.createElement("input");
  titleInput.className = "note-title";
  titleInput.type = "text";
  titleInput.placeholder = "Note title...";

  // Add Color Picker Button
  let colorPickerBtn = document.createElement("button");
  colorPickerBtn.className = "color-picker";
  let colorIcon = document.createElement("span");
  colorIcon.className = "material-icons";
  colorIcon.textContent = "palette";
  colorPickerBtn.appendChild(colorIcon);

  // Add Color Options Dropdown
  let colorOptions = document.createElement("div");
  colorOptions.className = "color-options";
  colorPalette.forEach((color) => {
    let colorOption = document.createElement("div");
    colorOption.className = "color-option";
    colorOption.setAttribute("data-color", color);
    colorOption.style.backgroundColor = color;
    colorOptions.appendChild(colorOption);
  });

  let deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  let deleteIcon = document.createElement("span");
  deleteIcon.className = "material-icons";
  deleteIcon.textContent = "delete_outline";
  deleteBtn.appendChild(deleteIcon);

  noteHeader.appendChild(titleInput);
  noteHeader.appendChild(colorPickerBtn);
  noteHeader.appendChild(colorOptions);
  noteHeader.appendChild(deleteBtn);

  let noteContent = document.createElement("div");
  noteContent.className = "note-content";
  let contentBox = document.createElement("div");
  contentBox.className = "note-input";
  contentBox.setAttribute("contenteditable", "true");
  contentBox.style.minHeight = "100px";
  noteContent.appendChild(contentBox);

  let noteFooter = document.createElement("div");
  noteFooter.className = "note-footer";
  noteFooter.textContent = `Created on: ${getCurrentTime()}`;

  noteDiv.appendChild(noteHeader);
  noteDiv.appendChild(noteContent);
  noteDiv.appendChild(noteFooter);

  const emptyMessage = notesContainer.querySelector(".empty-message");
  if (emptyMessage) emptyMessage.remove();

  notesContainer.appendChild(noteDiv);
  updateStorage();
  applyDragAndDrop();
  setupColorPicker(noteDiv);
  titleInput.focus();
});

notesContainer.addEventListener("input", function (e) {
  if (
    e.target.classList.contains("note-title") ||
    e.target.classList.contains("note-input")
  ) {
    updateStorage();
  }
});

notesContainer.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("material-icons") ||
    e.target.classList.contains("delete-btn")
  ) {
    const note = e.target.closest(".note");
    note.remove();
    if (notesContainer.querySelectorAll(".note").length === 0) {
      notesContainer.innerHTML =
        '<div class="empty-message">No notes yet. Click "New Note" to get started.</div>';
    }
    updateStorage();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.target.classList.contains("note-input")) {
    document.execCommand("insertLineBreak");
    event.preventDefault();
    updateStorage();
  }
});

// Search notes by title
searchBar.addEventListener("input", () => {
  const query = searchBar.value.toLowerCase();
  const notes = notesContainer.querySelectorAll(".note");
  notes.forEach((note) => {
    const title = note.querySelector(".note-title").value.toLowerCase();
    if (title.includes(query)) {
      note.style.display = "block";
    } else {
      note.style.display = "none";
    }
  });
});

// Drag and Drop Reordering
function applyDragAndDrop() {
  const notes = notesContainer.querySelectorAll(".note");
  notes.forEach((note) => {
    note.addEventListener("dragstart", (e) => {
      note.classList.add("dragging");
    });
    note.addEventListener("dragend", (e) => {
      note.classList.remove("dragging");
      updateStorage();
    });
  });

  notesContainer.addEventListener("dragover", (e) => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    const afterElement = getDragAfterElement(notesContainer, e.clientY);
    if (afterElement == null) {
      notesContainer.appendChild(dragging);
    } else {
      notesContainer.insertBefore(dragging, afterElement);
    }
  });
}

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".note:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

showNotes();
