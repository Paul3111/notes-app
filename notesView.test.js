/**
 * @jest-environment jsdom
 */

const fs = require('fs');

const NotesModel = require('./notesModel');
const NotesView = require('./notesView'); 

describe('Notes view.', () => {
    it('Displays three notes.', () => {
        document.body.innerHTML = fs.readFileSync('./index.html');
        const notes = new NotesModel();
        const display = new NotesView(notes);

        notes.addNote("Buy sambuca.");
        notes.addNote("Buy even more sambuca.");
        notes.addNote("Buy coki-cola.");
        display.displayNotes();
        expect(document.querySelectorAll('div.note').length).toBe(3);
    });
  });
