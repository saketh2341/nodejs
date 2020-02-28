const fs=require('fs')
const chalk=require('chalk')
const getnotes= function(){
    return "your notes..."
}

const addNotes = (tittle,body) => { 
    const notes=loadnotes()
    // const duplicatenotes= notes.filter((note) => note.tittle === tittle)
    const duplicatenote =notes.find((note) => note.tittle === tittle)
    if(!duplicatenote)
    {
        notes.push({
            tittle: tittle,
            body: body
        })
        savenotes(notes)
    }
    else{
        console.log("note already taken")
    }
}
    
const loadnotes =() => {
    try{
        const datajson=fs.readFileSync('notes.json').toString()
        return JSON.parse(datajson)
    }
    catch (e){
        return []
    }
}  

const savenotes = (notes) =>
{
    const dataJSON=JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const removenotes = (tittle) =>{
    const notes=loadnotes()
    const notetoadd=notes.filter((note) => note.tittle!==tittle
    )
    if(notes.length > notetoadd.length) console.log(chalk.green.inverse('note removed'))
    else{
        console.log(chalk.red.inverse('no note found'))
    }
    savenotes(notetoadd)
} 

const listnotes = () => {
    const notes=loadnotes()
    notes.forEach((note) => {
       console.log(note.tittle)        
    });
}

const readnotes= (tittle) => {
    const notes=loadnotes()
    const requirenote=notes.find((note) => note.tittle === tittle)
    if(requirenote){
    console.log(requirenote.tittle+requirenote.body)}
    else{
        console.log(chalk.red.inverse('error not found'))
    }
}

module.exports={
    getnotes:getnotes,
    addNotes:addNotes,
    removenotes:removenotes,
    listnotes:listnotes,
    readnotes:readnotes
}