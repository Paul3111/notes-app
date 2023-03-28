const NotesModel = require ('./notesModel');

class NotesView {
    constructor(notes) {
        this.notes = notes;
        this.mainContainerEl = document.querySelector('#main-container');
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