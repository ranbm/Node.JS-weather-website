const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url='http://api.weatherstack.com/current?access_key=9d3cc866d18489ec01a4cc7d69f14939&query='+latitude+','+longitude

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,body.current.weather_descriptions[0] + '.\n\rIt is currently ' + body.current.temperature + ' degress out.\n\rIt feels like ' + body.current.feelslike + ' degress.\n\rhumidity:'+body.current.humidity+'%')
        }
    })
}

module.exports = forecast