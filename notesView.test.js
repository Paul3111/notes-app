/**
 * @jest-environment jsdom
 */

const fs = require('fs');
// const NotesClient = require('./notesClient');
const NotesModel = require('./notesModel');
const NotesView = require('./notesView'); 

describe('Notes view.', () => {

    beforeEach (() => {
        document.body.innerHTML = fs.readFileSync('./index.html');
        })
    
    it('Displays three notes.', () => {
        const notes = new NotesModel();
        const display = new NotesView(notes);

        notes.addNote("Buy sambuca.");
        notes.addNote("Buy even more sambuca.");
        notes.addNote("Buy coki-cola.");
        display.displayNotes();
        expect(document.querySelectorAll('div.note').length).toBe(3);
    });

    it('Inputs a new note and displays it on the page.', () => {
        const note_1 = new NotesModel();
        const display = new NotesView(note_1);

        const input = document.querySelector('#message-input');
        input.value = "Something new."

        const button_1 = document.querySelector('#button-1');
        button_1.click();

        expect(document.querySelectorAll('div.note').length).toEqual(1);
        expect(document.querySelectorAll('div.note')[0].textContent).toEqual('Something new.');
    });

    it('Clears previous notes.', () => {
        const model = new NotesModel();
        const view = new NotesView(model);
        view.displayNotes();

        const buttonEl = document.querySelector('#button-1');
        const inputEl = document.querySelector('#message-input');

        inputEl.value = "walk the dog";
        buttonEl.click();
        
        inputEl.value = "go fish";
        buttonEl.click();

        const notes = document.querySelectorAll('.note');
        expect(notes.length).toBe (2);
    });

    it('displayNotesFromApi', () => {
        const mockData = ['Note1', 'Note2'];
        const mockModel = {setNotes: jest.fn(), getNotes: () => mockData };
        const mockClient = {loadNotes: (callback) => { callback(mockData) }};
        const view = new NotesView(mockModel, mockClient);

        view.displayNotesFromApi();
        expect(mockModel.setNotes).toHaveBeenCalledWith(mockData);
        expect(document.querySelector('div.note').textContent).toEqual ('Note1');
        expect(document.querySelector('#main-container')).toBe;

    })


    it('Displays error message when fetch fails.', () => {
        const mockData = ['Note1', 'Note2'];
        const mockModel = {setNotes: jest.fn(), getNotes: () => mockData };
        const mockClient = {loadNotes: (callback, callbackErr) => { callbackErr('error') }};
        const view = new NotesView(mockModel, mockClient);

        view.displayNotesFromApi();
        expect(document.querySelector('div.note').textContent).toEqual ("Oops, something went wrong!");
    })

  });
