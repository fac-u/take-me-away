const request = require('request');
const env = require('env2')('./api-keys.env');

function getWeather (cb) {
  var url = 'http://api.wunderground.com/api/' + process.env.WEATHER_KEY + '/forecast/lang:EN/q/autoip.json';
  request(url, (err, response, body) => {
    if (err || response.statusCode !== 200) {
      cb("Couldn't retrieve weather data");
    } else {
      cb(null, body);
    }
  })
}

module.exports = getWeather;
