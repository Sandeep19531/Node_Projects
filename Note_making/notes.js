const fs = require('fs');
const chalk = require('chalk');

//saving notes
const saveNotes =(notes)=>{
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJson);
};


//loading existing notes
const loadNotes = ()=>{
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    }
    catch(e){
        return [];
    }
}

//adding new notes
const addNote = (title,body)=>{
    const notes = loadNotes();
    const duplicate = notes.find((note)=> note.title === title);
    if(!duplicate){
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse.bold('new notes added!!'));
    }else{
        console.log(chalk.red.inverse.bold('note title already taken!!'));
    }
}

const removeNotes =(title)=> {
    const notes = loadNotes();
    const foundnote = notes.filter((node)=> node.title === title);
    if(foundnote.length !== 0){
        notes.pop(foundnote);
        saveNotes(notes);
        console.log(chalk.green.inverse.bold('node removed'));
    }
    else{
        console.log(chalk.red.inverse.bold('node not found'));
    }
}

const listNotes = ()=>{
    const notes = loadNotes();
    notes.forEach(element => console.log(chalk.blue.inverse.bold(element.title) + '\n\n\t'+chalk.redBright.inverse.bold(element.body)+'\n' ));
}

const readNote=(title)=>{
    const notes = loadNotes();
    const found = notes.find((note)=>note.title === title);
    found ? console.log(chalk.blue.inverse.bold(found.title) + '\n\n\t'+chalk.redBright.inverse.bold(found.body)+'\n' ) : console.log(chalk.red.inverse.bold('Node not found'));
}

module.exports = {
    addNote: addNote,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote
};