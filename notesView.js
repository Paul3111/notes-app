class NotesView {
/*    constructor(notes, client) {
        this.notes = notes;
        this.client = client;
        this.mainContainerEl = document.querySelector('#main-container');
        this.button_1 = document.querySelector('#button-1');
        this.button_2 = document.querySelector('#button-2');
        this.shortcodeRegex = /:[a-zA-Z0-9_]+:/g;

        this.button_1.addEventListener('click', () => {
            const messageInput = document.querySelector('#message-input');
            const newNote = messageInput.value;
            this.addNewNote(newNote);
         });

        this.button_2.addEventListener('click', () => {
            document.querySelector('div.note');
            this.client.reset();
            this.displayNotesFromApi();
            location.reload();
         });
    }
*/
    constructor(notes, client) {
      this.notes = notes;
      this.client = client;
      this.mainContainerEl = null;
      this.button_1 = null;
      this.button_2 = null;
      this.shortcodeRegex = /:[a-zA-Z0-9_]+:/g;
   }

  initialize() {
      this.mainContainerEl = document.querySelector('#main-container');
      this.button_1 = document.querySelector('#button-1');
      this.button_2 = document.querySelector('#button-2');

      this.button_1.addEventListener('click', () => {
          const messageInput = document.querySelector('#message-input');
          const newNote = messageInput.value;
          this.addNewNote(newNote);
      });

      this.button_2.addEventListener('click', () => {
          this.client.reset();
          this.displayNotesFromApi();
          location.reload();
      });
    }
    
    async addNewNote(newNote) {
        const emojifiedNote = await this.emojify(newNote);
        this.notes.addNote(emojifiedNote);
        const whatever = document.querySelector('#message-input');
        whatever.value = "";
        this.client.createNote(emojifiedNote, (data) => {
            console.log(data)
            this.displayNotesFromApi();
        }, () => {
            this.displayError()
        });       
    }

    async displayNotes() {
        const currNotes = document.querySelectorAll('.note');
        currNotes.forEach ((note) => {
            note.remove();
        })
    
        const notesList = this.notes.getNotes()
        for(const note of notesList) {
            const noteEl = document.createElement('div');
            noteEl.textContent = await this.emojify(note);
            noteEl.className = 'note';
            this.mainContainerEl.append(noteEl);
        }
    }

    async emojify(note) {
        try {
            const response = await fetch("https://makers-emojify.herokuapp.com/", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify( {"text": note} )
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
            this.notes.setNotes(data)
            this.displayNotes();
        }, (callbackErr) => {
            console.log(callbackErr)
            this.displayError();
        })

    }

    displayError() {
        const errorEl = document.createElement('div');
        errorEl.textContent = "Oops, something went wrong!";
        errorEl.className = 'note';
        this.mainContainerEl.append(errorEl);
    }
};

module.exports = NotesView;
