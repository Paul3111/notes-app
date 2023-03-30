const NotesModel = require ('./notesModel');
const NotesView = require ('./notesView');
const NotesClient = require ('./notesClient');

const client = new NotesClient();
const notes = new NotesModel();
//notes.addNote("Buy sambuca.");
//notes.addNote("Buy even more sambuca.");
//notes.addNote("Buy coki-cola.");
const views = new NotesView(notes, client);


console.log('The notes app is running.');
// notes.addNote('Buy milk');
// notes.addNote('Go to the gym');
// console.log(notes.getNotes());

//views.displayNotes();

views.displayNotesFromApi();