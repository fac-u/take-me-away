const Hapi = require('hapi');
const Vision = require('vision');
const Inert = require('inert');
const Handlebars = require('handlebars');
const server = new Hapi.Server();
const request = require("request");
const getArticles = require("./news");
const getWeather = require("./weather");
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

      let context = {};
      let counter = 2;

      function buildView (context) {
        reply.view('index', context);
      }

      getArticles(processArticles);
      getWeather(processWeather);

      function processWeather(err, obj) {
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
        counter--;
        if (counter === 0) {
          buildView(context);
        }
      }

      function processArticles(err, obj) {
        if (err) {
          console.log(err);
        }
        else {
          context.articles = obj;
        }
        counter--;
        if (counter === 0) {
          buildView(context);
        }
      }

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
});

module.exports = server;
