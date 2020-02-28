const fs=require('fs')
const datajson=fs.readFileSync('1-json.json').toString()
const data=JSON.parse(datajson)
console.log(data.name)