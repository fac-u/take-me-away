const request = require('request');
const {newsApiKey} = require('../api-keys.js');

var getArticles = (cb) => {
  request(`https://newsapi.org/v1/articles?source=the-guardian-uk&sortBy=latest&apiKey=${newsApiKey}`, (err, response, body) => {
    if (err) cb(err);
    else {
      let result = JSON.parse(body);
      let articles = result.articles.slice(0,2);
      cb(null, articles);
    }
  });
}

// getArticles(handlebarsFunctionGoesHere)

module.exports = getArticles;
