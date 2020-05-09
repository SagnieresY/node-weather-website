const request = require('postman-request');

const forecast = (long, lat, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=f03ed5912a7e5b87db95a5f9c796c6a3&query=' + lat + ',' + long


  request({ url, json: true }, (error, { body }) => {

    if (error) {
      //first is error, second is body
      callback('Unable to connect to API', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, {
        weatherInfo: body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees and it feels like ' + body.current.feelslike + ' degrees. The humidity is ' + body.current.humidity + '%, and the wind speed is ' + body.current.wind_speed + ' coming from ' + body.current.wind_degree + body.current.wind_dir + '.',
        weatherIcon: body.current.weather_icons[0]
      })
    }
  })
}

module.exports = forecast
