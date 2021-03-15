const request = require('request')

const forecast = (latitude, longitude, callback) => {


    const url = 'http://api.weatherstack.com/current?access_key=cfc7d8fb1facc8ed6ea997d46526e5f2&query=' + latitude + ',' + longitude

    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service')
        } else if (body.error) {
            callback('Unable for find the location')
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                weather_description: body.current.weather_descriptions[0],
                location: body.location.name
            })
        }
    })
}


module.exports = forecast