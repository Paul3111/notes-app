const NotesModel = require ('./notesModel');
const NotesView = require ('./notesView');
const NotesClient = require ('./notesClient');

const notes = new NotesModel();
const client = new NotesClient();
const views = new NotesView(notes, client);

console.log('The notes app is running.');

views.displayNotesFromApi();
