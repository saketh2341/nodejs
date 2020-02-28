const yargs=require('yargs')
const chalk=require('chalk')
const note=require('./notes.js')


yargs.command({
    command:'add',
    describe:'list a note',
    builder:{
       tittle:{
           describe:'note tittle',
           demandOption:true,
           type:'string'
       },
       body:{
        describe:'note tittle',
        demandOption:true,
        type:'string'
       }
    },
    handler(argv){
      note.addNotes(argv.tittle,argv.body)
    }
})

yargs.command({
    command:'remove',
    describe:'list a note',
    builder:{
        tittle:{
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
      note.removenotes(argv.tittle)
    }
})

yargs.command({
    command:'read',
    describe:'read a note',
    builder:{
        tittle:{
            demandOption:true,
            type:'string'
        }
        
    },
    handler(argv) {
      note.readnotes(argv.tittle)
    }
})

yargs.command({
    command:'list',
    describe:'list a note',
    handler(){
      note.listnotes()
    }
})

console.log(yargs.argv)
console.log(chalk.green('HELLO WORLD'));
console.log(chalk.blue.inverse.bold('sucess'))

yargs.parse()