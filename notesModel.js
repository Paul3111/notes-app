class NotesModel {
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

    SetNotes (item) {
        this.notes = item;
    }
};

module.exports = NotesModel;