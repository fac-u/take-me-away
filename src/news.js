const request = require('request');
const {newsApiKey} = require('../api-keys.js');
const env = require('env2')('./api-keys.env');

var getArticles = (cb) => {
  request(`https://newsapi.org/v1/articles?source=the-guardian-uk&sortBy=latest&apiKey=${process.env.NEWS_KEY}`, (err, response, body) => {
    let articles;
    if (err || response.statusCode !== 200) {
      articles = [{title: 'Giraffes rob bank in Nairobi'}, {title: 'Aliens land on earth, not in America'}];
    } else {
      let result = JSON.parse(body);
      articles = result.articles.slice(0,5);
    }
    cb(articles);
  });
}

// getArticles(handlebarsFunctionGoesHere)

module.exports = getArticles;
