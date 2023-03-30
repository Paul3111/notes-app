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

    setNotes (item) {
        this.notes = item;
    }
};

module.exports = NotesModel;