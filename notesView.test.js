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

    it('Inputs a new note and displays it on the page.', () => {
        document.body.innerHTML = fs.readFileSync('./index.html');

        const note_1 = new NotesModel();
        const display = new NotesView(note_1);

        const input = document.querySelector('#message-input');
        input.value = "Something new."

        const button_1 = document.querySelector('#button-1');
        button_1.click();

        expect(document.querySelectorAll('div.note').length).toEqual(1);
        expect(document.querySelectorAll('div.note')[0].textContent).toEqual('Something new.');
    });

  });
