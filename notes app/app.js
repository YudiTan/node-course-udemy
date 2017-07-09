const fs = require('fs');
const notes = require('./notes.js');
const _ = require('lodash');
const yargs = require('yargs');
const titleOptions = {
		describe: 'Title of note',
		demand: true,
		alias: 't'
	};
const bodyOptions = {
		describe: "Content of note",
		demand: true,
		alias: 'b'
	};

const argv = yargs
	.command('add', 'Add a new note', {title: titleOptions,
	body: bodyOptions})
	.command('list', 'List all notes')
	.command('read', 'Read a note', {
		title:titleOptions
	})
	.command('remove', 'Remove a note', {title: titleOptions})
	.help()
	.argv;
	
var command = argv._[0];

console.log("Yargs:", argv);


if (command === "add"){
	var note = notes.addNote(argv.title, argv.body);
	if (note){
		console.log('Note created!');
		notes.logNote(note);
	} else {
		console.log('Note title already exists');
		};

} else if (command === "list"){
	var allNotes = notes.getAll();
	allNotes.forEach((note) => notes.logNote(note));
} else if (command === "read"){
	var note = notes.getNote(argv.title);
	if (note){
		console.log('fetching note');
		notes.logNote(note);
	} else {
		console.log('Note not found');
	};

}else if (command === "remove"){
	var returnValue = notes.removeNote(argv.title);
	var message = returnValue ? 'Successfully removed': 'Note was not found.';
	console.log(message);

}else {
	console.log("Command not recognized");
}
