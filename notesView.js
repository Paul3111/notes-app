const NotesModel = require ('./notesModel');

class NotesView {
    constructor(notes) {
        this.notes = notes;
        this.mainContainerEl = document.querySelector('#main-container');
        this.button_1 = document.querySelector('#button-1');

        this.button_1.addEventListener('click', () => {
            const newNote = document.querySelector('#message-input').value;
            this.addNewNote(newNote);
         });
     
    }

    addNewNote(newNote) {
        this.notes.addNote(newNote);
        this.displayNotes();
    }

    displayNotes() {
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