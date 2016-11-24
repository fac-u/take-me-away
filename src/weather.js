const request = require('request');
const env = require('env2')('./api-keys.env');

const weather = {};

weather.get = (cb) => {
  var url = 'http://api.wunderground.com/api/' + process.env.WEATHER_KEY + '/forecast/lang:EN/q/autoip.json';
  request(url, (err, response, body) => {
    if (err || response.statusCode !== 200) {
      cb("Couldn't retrieve weather data");
    } else {
      cb(null, body);
    }
  })
}

weather.process = (context, counter, callback) => {
  return (err, obj) => {
    let weatherData;
    if (err) {
      console.log(err);
    }
    else {
      obj = JSON.parse(obj);
      let location = obj.forecast.simpleforecast.forecastday[0].date.tz_long;
      let cond = obj.forecast.simpleforecast.forecastday[0].conditions;
      const weatherData = {
        city: location.replace(/\w+\//, ''),
        cond: cond.toLowerCase(),
        topTemp: obj.forecast.simpleforecast.forecastday[0].high.celsius,
        icon: obj.forecast.simpleforecast.forecastday[0].icon_url
      }
      context.weatherData = weatherData;
    }
    counter.remaining--;
    if (counter.remaining === 0) {
      callback(context);
    }
  }
}

module.exports = weather;
