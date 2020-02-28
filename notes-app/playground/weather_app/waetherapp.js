const request=require('request')
const geocode=require('./geocode.js')
const forecast=require('./forecast.js')

const place=process.argv[2]

geocode( place , (error,{latitude, longitude, location}) =>{
    if(error){
        return console.log(error)
    }
    forecast(latitude,longitude, (error, forecastdata) => {
       if(error){
        return console.log('Error', error)
       }
        console.log(location)
        console.log('Data', forecastdata)
      })
})
   

