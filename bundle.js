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
        setNotes(item) {
          this.notes = item;
        }
      };
      module.exports = NotesModel2;
    }
  });

  // notesView.js
  var require_notesView = __commonJS({
    "notesView.js"(exports, module) {
      var NotesView2 = class {
        constructor(notes2, client2) {
          this.notes = notes2;
          this.client = client2;
          this.mainContainerEl = document.querySelector("#main-container");
          this.button_1 = document.querySelector("#button-1");
          this.button_2 = document.querySelector("#button-2");
          this.shortcodeRegex = /:[a-zA-Z0-9_]+:/g;
          this.button_1.addEventListener("click", () => {
            const messageInput = document.querySelector("#message-input");
            const newNote = messageInput.value;
            this.addNewNote(newNote);
          });
          this.button_2.addEventListener("click", () => {
            document.querySelector("div.note");
            this.client.reset();
            this.displayNotesFromApi();
            location.reload();
          });
        }
        async addNewNote(newNote) {
          const emojifiedNote = await this.emojify(newNote);
          this.notes.addNote(emojifiedNote);
          const whatever = document.querySelector("#message-input");
          whatever.value = "";
          this.client.createNote(emojifiedNote, (data) => {
            console.log(data);
            this.displayNotesFromApi();
          }, () => {
            this.displayError();
          });
        }
        async displayNotes() {
          const currNotes = document.querySelectorAll(".note");
          currNotes.forEach((note) => {
            note.remove();
          });
          const notesList = this.notes.getNotes();
          for (const note of notesList) {
            const noteEl = document.createElement("div");
            noteEl.textContent = await this.emojify(note);
            noteEl.className = "note";
            this.mainContainerEl.append(noteEl);
          }
        }
        async emojify(note) {
          try {
            const response = await fetch("https://makers-emojify.herokuapp.com/", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ "text": note })
            });
            const data = await response.json();
            return data.emojified_text;
          } catch (error) {
            console.error(error);
            return note;
          }
        }
        displayNotesFromApi() {
          this.client.loadNotes((data) => {
            this.notes.setNotes(data);
            this.displayNotes();
          }, (callbackErr) => {
            console.log(callbackErr);
            this.displayError();
          });
        }
        displayError() {
          const errorEl = document.createElement("div");
          errorEl.textContent = "Oops, something went wrong!";
          errorEl.className = "note";
          this.mainContainerEl.append(errorEl);
        }
      };
      module.exports = NotesView2;
    }
  });

  // notesClient.js
  var require_notesClient = __commonJS({
    "notesClient.js"(exports, module) {
      var NotesClient2 = class {
        loadNotes(callback, callbackErr) {
          fetch("http://localhost:3000/notes").then((response) => response.json()).then((data) => {
            callback(data);
          }).catch((error) => {
            callbackErr(error);
          });
        }
        createNote(data, callback, callbackErr) {
          fetch("http://localhost:3000/notes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "content": data })
          }).then((response) => {
            return response.json();
          }).then((data2) => callback(data2)).catch((error) => {
            callbackErr(error);
          });
        }
        reset(callback, callbackErr) {
          fetch("http://localhost:3000/notes", {
            method: "DELETE"
          }).then((response) => {
            if (response.ok) {
              callback();
            } else {
              throw new Error("Failed to reset notes.");
            }
          }).catch((error) => {
            callbackErr(error);
          });
        }
      };
      module.exports = NotesClient2;
    }
  });

  // index.js
  var NotesModel = require_notesModel();
  var NotesView = require_notesView();
  var NotesClient = require_notesClient();
  var notes = new NotesModel();
  var client = new NotesClient();
  var views = new NotesView(notes, client);
  console.log("The notes app is running.");
  views.displayNotesFromApi();
})();
