const request = require('request');
// gets the weather from darksky Api
const forecast = (latitude, longitude, callback) => {
    const darkskyToken = '553d0d73e29efbde79bec5264e2fcec8';

    const url = `https://api.darksky.net/forecast/${darkskyToken}/${latitude},${longitude}?units=si`;

    request({ url, json: true},(error, {body}) => {
        if(error) {
            callback('Unable to connect to the weather service!',undefined );
        } else if (body.error) {
            callback('Unable to find the location!', undefined);
        } else {
            const currently = body.currently;
            const hourly = body.hourly;
            const temperature = Math.round(currently.temperature);
            callback(undefined, `Today's Summary: ${hourly.summary}. It is currently ${temperature} degrees out. There is a ${currently.precipProbability*100} % chance of rain.`);
        }
        
    })


}

module.exports = forecast;