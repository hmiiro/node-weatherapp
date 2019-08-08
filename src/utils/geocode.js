const request = require('request');
const geocode = (address, callback) => {
    // gets the address and pulls its latitude and longtude values from mapbox API
    const mapboxToken = 'pk.eyJ1IjoiZml4ZXJ1ZyIsImEiOiJjanl2ODl5YnkwbDRsM2htZG9lMWpqbDM3In0.w8_JdfUtK2O2VR_n6lSuMA';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${mapboxToken}&limit=1`
    //gets the latitude and longtude values from mapbox
    request({url, json: true}, (error, {body}= {}) => {
            if(error) {
               return callback('Unable to connect to the Maps service!', undefined) // we provide error string and undefined since we only want to log error
            } else if (body.features.length === 0) {
                callback(`Unable to find the Maps for provided location "${address}". Try another location`, undefined); // we provide error string and undefined since we only want to log error
            } else {
                callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })
                
            }
       })
}

module.exports = geocode