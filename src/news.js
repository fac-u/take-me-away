const request = require('request');
const {newsApiKey} = require('../api-keys.js');

var getArticles = (cb) => {
  var url = `https://newsapi.org/v1/articles?source=the-guardian-uk&sortBy=latest&apiKey=${newsApiKey}`;
  request(url, (err, response, body) => {
    if (err || response.statusCode !== 200) {
      cb(err);
    } else {
      let result = JSON.parse(body);
      let articles = result.articles.slice(0,5);
      cb(null, articles);
    }
  });
}

module.exports = getArticles;

/*
articles = [{title: 'Giraffes rob bank in Nairobi'}, {title: 'Aliens land on earth, not in America'}];
*/
