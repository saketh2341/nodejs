const path=require('path')
const express=require('express')
const app=express()
const hbs=require('hbs')
const geocode=require('./geocode.js')
const forecast=require('./forecast.js')
const publicdirpath=path.join(__dirname,'public')
const viewpath=path.join(__dirname,'templates/views')
const partialpath=path.join(__dirname,'templates/partials')

app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)
app.use(express.static(publicdirpath))

app.get("",(req,res) => {
    res.render('weather.hbs')
})

app.get('/help',(req,res) => {
    res.render('help',{
        name:'saketh'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address)
    {
        return res.send({
            error:'u should provide address'
        })
    }
    geocode( req.query.address , (error,{latitude, longitude, location} ={} ) =>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastdata) => {
           if(error){
            return res.send({error})
           }
        //    console.log(address)
            res.send({
                latitude:forecastdata.summary,
                longitude:forecastdata.temperature,
                location:forecastdata.precpitation
            })
          })
    })
})

app.listen(3000, () =>{
    console.log('server is up')
})