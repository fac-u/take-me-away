const request = require('request');
const env = require('env2')('./api-keys.env');

const news = {};

news.get = (cb) => {
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

news.process = (context, counter, callback) => {
  return (err, obj) => {
    if (err) {
      console.log(err);
    }
    else {
      context.articles = obj;
    }
    counter.remaining--;
    if (counter.remaining === 0) {
      callback(context);
    }
  }
}

module.exports = news;
