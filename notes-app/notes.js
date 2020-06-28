const chalk = require('chalk')
const fs = require('fs');

// const getNotes = () => ( fs.readFileSync('notes.txt').length );

const readNote = (title) => {
    const notes = loadNotes();
    const selectedNote = notes.find( (note) => note.title === title );

    if( selectedNote ) {
        console.log( chalk.green.inverse( "Note body " + selectedNote.body ))
    } else {
        console.log( chalk.red.inverse("Note not found"));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(notes);
    notes.forEach(element => {
        console.log( chalk.yellow.inverse(element.title));
        console.log( chalk.white.inverse(element.body));
    });
}

const addNote = (title, body) => {
    const notes = loadNotes();
    // const duplicateNotes = notes.filter( 
        // (note) => ( note.title===title ) );

    const duplicateNote = notes.find( (note) => note.title === title );

    // if( duplicateNotes.length > 0 ) {
    if( !duplicateNote ) {
        console.log("Aborting! Note title already exists!")
        return;
    }
    notes.push({
        title: title,
        body: body
    });
    saveNotes(notes);
}

const removeNote = (title) => {
    const notes = loadNotes();
    const updatedNotes = notes.filter( 
        (note) => ( note.title!=title ) );

    if( updatedNotes.length < notes.length ) {
        console.log( chalk.green.inverse('Note removed!'));
        saveNotes(updatedNotes);
    } else {
        console.log( chalk.red.inverse('No note found!'));
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }
}

const saveNotes = (newNotes) => {
    const dataJSON = JSON.stringify(newNotes);
    fs.writeFileSync('notes.json', dataJSON);
}

module.exports = { 
    // getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};