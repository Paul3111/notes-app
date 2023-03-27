const NotesModel = require ('./notesModel');

describe('NotesModel.', () => {

    let notes;

    beforeEach( () => {
        notes = new NotesModel(); 
    });

    it('Initializes with an empty notes list.', () => {
        expect(notes).toBeInstanceOf(NotesModel);
        expect(notes.getNotes()).toEqual ([]);
    });

    it('Adds a note to the list.', () => {
        notes.addNote('Buy milk');
        expect(notes.getNotes()).toEqual (['Buy milk'])
    });

    it('Adds two notes to the list.', () => {
        notes.addNote('Buy milk');
        notes.addNote('Go to the gym');
        expect(notes.getNotes()).toEqual (['Buy milk', 'Go to the gym'])
    });

    it('Resets the list of notes.', () => {
        notes.addNote('Buy milk');
        notes.addNote('Go to the gym');
        notes.reset();
        expect(notes.getNotes()).toEqual ([])
    });
});