(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // notesModel.js
  var require_notesModel = __commonJS({
    "notesModel.js"(exports, module) {
      var NotesModel2 = class {
        constructor() {
          this.notes = [];
        }
        getNotes() {
          return this.notes;
        }
        addNote(note) {
          this.notes.push(note);
        }
        reset() {
          this.notes = [];
        }
      };
      module.exports = NotesModel2;
    }
  });

  // notesView.js
  var require_notesView = __commonJS({
    "notesView.js"(exports, module) {
      var NotesModel2 = require_notesModel();
      var NotesView2 = class {
        constructor(notes2) {
          this.notes = notes2;
          this.mainContainerEl = document.querySelector("#main-container");
          this.button_1 = document.querySelector("#button-1");
          this.button_1.addEventListener("click", () => {
            const messageInput = document.querySelector("#message-input");
            const newNote = messageInput.value;
            this.addNewNote(newNote);
          });
        }
        addNewNote(newNote) {
          this.notes.addNote(newNote);
          const whatever = document.querySelector("#message-input");
          whatever.value = "";
          this.displayNotes();
        }
        displayNotes() {
          const currNotes = document.querySelectorAll(".note");
          currNotes.forEach((note) => {
            note.remove();
          });
          const notesList = this.notes.getNotes();
          notesList.forEach((note) => {
            const noteEl = document.createElement("div");
            noteEl.textContent = note;
            noteEl.className = "note";
            this.mainContainerEl.append(noteEl);
          });
        }
      };
      module.exports = NotesView2;
    }
  });

  // index.js
  var NotesModel = require_notesModel();
  var NotesView = require_notesView();
  var notes = new NotesModel();
  var views = new NotesView(notes);
  console.log("The notes app is running.");
  views.displayNotes();
})();
