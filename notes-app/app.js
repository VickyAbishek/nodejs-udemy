const yargs = require('yargs')
const notes = require('./notes.js')

yargs.version('1.1.0')

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note contents',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => ( notes.addNote( argv.title, argv.body ) )
})

yargs.command({
    command: 'del',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
    },
    handler: (argv) => ( notes.removeNote(argv.title) )
})

yargs.command({
    command: 'read',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
    },
    handler: (argv) => ( notes.readNote(argv.title) )
})

yargs.command({
    command: 'list',
    handler: () => { console.log('Listing all notes');
        notes.listNotes();
    }
})

yargs.parse()

const tasks = {
    tasks: [
    {text: 'Grocery', completed: true },
    { text: 'Clean yard', completed: false },
    {text: 'Course', completed:false }],
    getTasksToDo() {
        return this.tasks.filter(
            (task) => !task.completed
        );
    }
}

console.log(tasks.getTasksToDo())