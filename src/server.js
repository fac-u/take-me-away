const Hapi = require('hapi');
const Vision = require('vision');
const Inert = require('inert');
const Handlebars = require('handlebars');
const server = new Hapi.Server();
const request = require("request");
const getArticles = require("./news");
const {wundergroundKey} = require('../api-keys.js');
const env = require('env2')('./api-keys.env');


server.connection({
  port: process.env.PORT || 4000
});

server.register(Vision, (err) => {
  if (err) throw err;

  server.views({
    engines: {
      html: Handlebars
    },
    path: 'views',
    layoutPath: 'views/layout',
    layout: 'layout',
    partialsPath: 'views/partials'
  });

  server.route({
    path: '/',
    method: 'GET',
    handler: (req, reply) => {

      var url = 'http://api.wunderground.com/api/' + process.env.WEATHER_KEY + '/forecast/lang:EN/q/autoip.json';
      request(url,  function(err, response, body) {
        if (err) {
          //insert addition code here in case of lack of weather content
          throw err;
        }
        processWeatherObject(body, function (err, weatherData) {
          var context = {temp: weatherData.topTemp, location: weatherData.yourLocation, cond: weatherData.cond, icon: weatherData.icon};
          function buildView(result) {
            context.articles = result;
            reply.view('index', context);
          }
          getArticles(buildView);
        })
      });

      function processWeatherObject(obj, cb) {
        obj = JSON.parse(obj);
        var yourLocationRaw = obj.forecast.simpleforecast.forecastday[0].date.tz_long;
        weatherData.yourLocation = yourLocationRaw.replace(/\w+\//, '');
        var cond = obj.forecast.simpleforecast.forecastday[0].conditions;
        var icon = obj.forecast.simpleforecast.forecastday[0].icon_url
        weatherData.icon = icon
        weatherData.cond = cond.toLowerCase();
        weatherData.topTemp = obj.forecast.simpleforecast.forecastday[0].high.celsius;
        cb(err, weatherData);
      }
      var weatherData = {};
    }
  });
});

server.register(Inert, (err) => {
  if (err) throw err;

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public'
      }
    }
  })
})

module.exports = server;
