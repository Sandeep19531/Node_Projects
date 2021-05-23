const yargs = require('yargs');
const notes = require('./notes');

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        body:{
            describe: 'adding the body',
            demandOption: true,
            type:'string'
        },
        title:{
            describe: 'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title,argv.body);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Removing a node',
    builder:{
        title:{
            describe:'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNotes(argv.title);
    }
});

yargs.command({
    command: 'list',
    describe: 'Listing a node',
    handler(){
        notes.listNotes();
    }
});

yargs.command({
    command: 'read',
    describe: 'Reading a node',
    builder:{
        title:{
            describe:'Title of the node',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title);
    }
});

yargs.parse();