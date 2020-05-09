const request = require('postman-request');

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FnbmllcmVzeSIsImEiOiJjazZqdXNwM2cwMDQyM2VueDJlb3R2azc3In0.k-7tUdlt2_9kKxxK9x6YMw&limit=1'

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to API', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        long: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}


module.exports = geocode
