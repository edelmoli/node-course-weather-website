const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=cfc7d8fb1facc8ed6ea997d46526e5f2&query=' + longitude + ',' + latitude
 
    request({url, json:true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service')
          } else if (body.error) {
            callback('Unable to find the location')
         } else {
 
            callback(undefined,'In '+ body.location.name+', it is '+ body.current.weather_descriptions[0] +'. The temperature is '+ body.current.temperature+'C and if feels like '+ body.current.feelslike+'C')
                
         }
    
    })
}

module.exports = forecast

