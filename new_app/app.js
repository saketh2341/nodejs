const express=require('express')
const hbs=require('hbs')
const app=express()
const port=process.env.PORT || 3000
const fs=require('fs')

fs.readFileSync('views/send.hbs')
app.set('view engine','hbs')


app.get('/show', async (req,res) =>{
    res.render('send')
})

app.listen(port, () =>{
    console.log('server is up on ' + port)
})

