const fs = require('fs');
const _ = require('lodash');

var fetchNote = () => {

	try{
	var noteString = fs.readFileSync('notes-data.json');
	return JSON.parse(noteString);
	}catch(e){
		return []
	};
};

var saveNote = (notes) => {
	fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};




var addNote = (title, body) => {
	var notes = fetchNote();
	var note = { 
		title,
		body,
	};
	var duplicateNotes = notes.filter((note) => note.title === title);
	if (duplicateNotes.length === 0){
		notes.push(note);
		saveNote(notes);
		return note;
	}
};

var getAll = () => {
	return fetchNote();


};

var getNote = (title) => {
	var notes = fetchNote();
	var note = notes.filter((note) => note.title === title);
	return note[0];
};

var removeNote = (title) => {
	var notes = fetchNote();
	var filter = notes.filter((note) => note.title !== title);
	saveNote(filter);

	return notes.length !== filter.length;
	

};

var logNote = (note) => {
	console.log('-----');
	console.log('Title: ' + note.title + " Content: " + note.body);
};


module.exports = {
	logNote,
	addNote,
	getAll,
	getNote,
	removeNote,
};