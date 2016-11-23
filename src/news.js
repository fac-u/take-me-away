const request = require('request');
const {newsApiKey} = require('../api-keys.js');

var getArticles = (cb) => {
  request(`https://newsapi.org/v1/articles?source=the-guardian-uk&sortBy=latest&apiKey=${newsApiKey}`, (err, response, body) => {
    let articles;
    if (err || response.statusCode !== 200) {
      articles = [{title: 'Giraffes rob bank in Nairobi'}, {title: 'Aliens land on earth, not in America'}];
    } else {
      console.log('Body is: ', body)
      let result = JSON.parse(body);
      articles = result.articles.slice(0,2);
    }
    cb(articles);
  });
}

// getArticles(handlebarsFunctionGoesHere)

module.exports = getArticles;
