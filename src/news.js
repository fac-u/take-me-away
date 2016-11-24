const request = require('request');
const env = require('env2')('./api-keys.env');

var getArticles = (cb) => {
  var url = `https://newsapi.org/v1/articles?source=the-guardian-uk&sortBy=latest&apiKey=${process.env.NEWS_KEY}`;
  request(url, (err, response, body) => {
    if (err || response.statusCode !== 200) {
      cb("Couldn't retrieve news articles");
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
