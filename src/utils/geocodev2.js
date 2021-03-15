const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZWRlbG1vbGkiLCJhIjoiY2tobDJxYnI1MDFtdDJwdDRzajZpbTMydSJ9.646A-y1soJ6GCW0tkoUCfQ&limit=1'

    request({url, json: true}, (error, {body} = {}) => {

        if (error) {
            callback('Unable to connect to geolocation service')
            
        } else if (body.features.length === 0) {
            callback('Unable to geolocate the location')
        } else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]   
            callback(undefined,{
                latitude,
                longitude,
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
