# Notes Application

## Overview

This project is a **web-based Notes App** designed to allow users to create, manage, search, and customize notes with a clean, responsive interface. The app is built using HTML, CSS, and JavaScript, with data stored locally in the browser using `localStorage`. Features include color customization, drag-and-drop reordering, and live search.

## Features

- **Create Notes**: Add new notes with a title and content.
- **Edit Notes**: Edit titles and content directly in the note.
- **Delete Notes**: Delete notes with a single click.
- **Search Notes**: Filter notes by title using a search bar.
- **Color Customization**: Change the background color of notes using a color picker.
- **Drag-and-Drop**: Reorder notes by dragging and dropping.
- **Local Storage**: Persist notes in the browser using `localStorage`.
- **Responsive Design**: Adapts to various screen sizes, including mobile devices.

## Setup

1. **Clone or Download**: Download the project files or clone the repository.
2. **Host the Application**:
   - Place the files in a web server directory
   - Or open `index.html` directly in a browser (note: `localStorage` works without a server, but some browser restrictions may apply).
3. **Dependencies**: Uses the Google Material Icons library, loaded via CDN in `index.html`. Ensure internet access to load icons.
4. **Run**: Open `index.html` in a modern browser (e.g., Chrome, Firefox, Edge).

## Usage

1. **Create a Note**: Click the "New Note" button to create a note.
2. **Edit a Note**: Click and type directly in the note's title or content area.
3. **Delete a Note**: Click the trash icon to remove a note.
4. **Change Color**: Click the palette icon to choose a note background color.
5. **Reorder Notes**: Drag and drop notes to rearrange them.
6. **Search Notes**: Use the search bar to filter notes by title.
7. **Save**: All changes are saved automatically in `localStorage`.

## Notes

- Data is stored in the browser's `localStorage` and will persist across sessions in the same browser.
- To reset or clear the notes, clear the browser’s `localStorage` through developer tools or browser settings.
- This app is frontend-only and does not require a backend server.
