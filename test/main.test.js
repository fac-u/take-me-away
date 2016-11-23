const server = require('../src/server.js');
const tape = require('tape');
const fs = require('fs');
const path = require('path');

tape('Is the server running OK?', (t) => {
  server.start(err => {
    if(err) {
      t.error(err);
    } else {
      t.pass('sever is running');
    }
    server.stop();
    t.end();
  })
});

tape('check homepage route', (t) => {
  var options = {
    url: '/',
    method: 'GET'
  }
  server.inject(options, (res) => {
    t.equal(res.statusCode, 200, "200 status code, route exists");
    t.end();
  })
})
/*
Server handles dynamically generated pages (ie. views)
Server handles 404s */
tape('Check the main handler "/" serves the homepage template', (t) => {
  var options = {
    url: '/',
    method: 'GET'
  }
  server.inject(options, (res) => {
    t.ok(res.payload.includes('<title>Homepage</title>'));
    t.end();
  })
})

tape('Check other public files route', (t) => {
  var options = {
    url: '/style.css',
    method: 'GET'
  }
  server.inject(options, (res) => {
    t.equal(res.payload, fs.readFileSync(path.join(__dirname, '..', 'public', 'style.css'), 'utf-8'), "correct file served");
    t.end();
  })
})
