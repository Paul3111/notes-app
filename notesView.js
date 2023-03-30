const NotesModel = require ('./notesModel');

class NotesView {
    constructor(notes) {
        this.notes = notes;
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
        this.displayNotes();
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
};

module.exports = NotesView;