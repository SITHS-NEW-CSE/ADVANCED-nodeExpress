const express = require('express');
// we make an instance of an express Router
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // we can pass data into `index.hbs` as the second argument of res.render()
  res.render('index', { title: 'Express lesson 2!' });
});

// this router will "route" to /random because the router is mounted on "/" on app.js
router.get('/random', (req, res) => {
  // return a random number 0-100
  const random = Math.random() * 100;
  // render `random.hbs` along with the random number
  res.render('random', {
    title: "Random Number",
    number: random
  })
  // NOTE: realize that you can call APIs and receive results before rendering the page
})

// return the router for app.js to `require()` and assign
module.exports = router;
