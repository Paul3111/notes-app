class NotesView {
    constructor(notes, client) {
        this.notes = notes;
        this.client = client;
        this.mainContainerEl = document.querySelector('#main-container');
        this.button_1 = document.querySelector('#button-1');

        this.button_1.addEventListener('click', () => {
            const messageInput = document.querySelector('#message-input');
            const newNote = messageInput.value;
            this.addNewNote(newNote);
         });
    }

    addNewNote(newNote) {
        this.notes.addNote(newNote);
        const whatever = document.querySelector('#message-input');
        whatever.value = "";
        this.client.createNote(newNote, (data) => {
            console.log(data)
            this.displayNotesFromApi();
        }, () => {
            this.displayError()
        });       
    }

    displayNotes() {
        const currNotes = document.querySelectorAll('.note');
        currNotes.forEach ((note) => {
            note.remove();
        })

        const notesList = this.notes.getNotes()
        notesList.forEach(note => {
            const noteEl = document.createElement('div');
            noteEl.textContent = note;
            noteEl.className = 'note';
            this.mainContainerEl.append(noteEl);
        })
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