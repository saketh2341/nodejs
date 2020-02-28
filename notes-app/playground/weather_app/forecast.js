const request=require('request')

const forecast=(latitude,longitude,callback) => {
    const url='https://api.darksky.net/forecast/5697b52b71d82f762201b0dc1d490f4f/' + latitude + ',' +longitude

    request( { url, json: true }, (error, {body }) => {
        if(error)
        {
            callback('unable to connect',undefined)
        } else if(body.error)
        {
            callback('unable to find the location',undefined)
        }
        else{
            callback(undefined,{
                summary:body.daily.data[0].summary,
                temperature:body.currently.temperature,
                precpitation :body.currently.precipProbability
            })
        }
    })
}

module.exports=forecast