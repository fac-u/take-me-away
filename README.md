# Take Me Away (aka Keep Me at Home)

### Resources
- Weather api: http://api.wunderground.com/api/
- News api: https://newsapi.org/v1/articles

### Project goals
#### Core
- build a simple hapi app
- consider user stories in the design phase
- use test driven development (using the techniques and server.inject method)
- query at least two APIs on the backend
- use the retrieved data to populate a handlebars template
- use server-side rendering to display on the front-end
- weather icons from the 80s

#### Stretch
- high test-coverage on front-end and back-end
- host the project on heroku
- images of user location from image api
- use basic ES6 syntax in this project:
  - const for all variables whose values will never be re-assigned.
  - let for all variables whose values will be re-assigned.
  - (arg1, arg2) => {} arrow functions whenever you use callbacks.
  - template ${literals} whenever you use strings that require concatenation: i.e. 'string 1 ' + 'string 2'.

### How to run
#### App
1. Clone the repo to a local directory
2. Run npm install from the root folder to install dependencies
3. Run nodemon from the terminal to start the server through nodemon ```npm run devStart```, or ```npm start``` without nodemon
4. Add a new file called 'api-keys.env' to the root folder and request keys from FAC-U team
4. Access the front end by visiting http://localhost:4000

#### Tests
1. Run ```npm test``` to execute tape tests
- test/main.test.js: these are the server, route and handler tests
- ```run coverage``` to run Istanbul & Codecov
- Back-end tests are written using Tape and run through Tap-spec
- At this stage there are no QUnit tests

### Key files
- src/server.js: core server functionality
- src/news.js: sends requests to and processes responses from newsapi.org
- src/weather.js: sends requests to and processes responses from wunderground.com
- views/layout/layout.html: top-level structure of homepage with template for content in body
- views/index.html: second-tier page structure, pulling in core page elements
- views/partials/weather.html: first page element
- views/partials/news.html: second page element
- public/main.css: main stylesheet

### Dependencies
- Env2
- Handlebars
- Hapi
- Inert
- Request
- Vision
- xmlhttprequest

### Dev dependencies
- Tape
- Tap-spec
- Eslint semi-standard
- Nodemon
- Codecov
- Istanbul


### Project history
#### Initial idea - abandoned
Our initial idea was to build an app for the following user story:
'I am a busy professional. I want to get out of town this weekend because I want to explore.'

Our plan was to use the [Skyscanner api](http://en.business.skyscanner.net/developers/) to get cheap flights from the user's destination and present three of these with weather in that destination and some points of interest from an api like [Yelp](https://www.yelp.com/developers/documentation/v3) or [Factual](http://developer.factual.com).

Due to major issues with our chosen apis, we abandoned this project at midday on Tuesday.

#### Key learning
It's clear to us that we should have set milestones for our project. For next time, we need to establish how long we have for planning and testing dependencies (such as apis). We will set a timeframe ahead of the next stage to check in on whether things are tracking to our plan, or whether we need to redesign or rethink in order to meet the agreed deadlines.
