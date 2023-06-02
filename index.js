const NotesModel = require ('./notesModel');
// const NotesView = require ('./notesView');
const NotesViewBrowser = require ('./notesViewBrowser');
const NotesClient = require ('./notesClient');

const notes = new NotesModel();
const client = new NotesClient();
const views = new NotesViewBrowser(notes, client);

console.log('The notes app is running.');

views.displayNotesFromApi();
