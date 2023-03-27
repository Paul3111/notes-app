const NotesModel = require ('./notesModel');

const notes = new NotesModel();

console.log('The notes app is running.');
console.log(notes.getNotes());