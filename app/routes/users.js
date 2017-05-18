const express = require('express');
const router = express.Router();

require('es6-promise').polyfill();
require('isomorphic-fetch');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //  with request

  res.setHeader('Content-Type', 'application/json');

  let username = req.query.user.username;
  let data;

  fetch(`https://api.github.com/users/${username}`, {
    headers: {'User-Agent': 'sampleApp'}
  }).then(response => response.json()
      .then(json => {
        if (response.ok) {
          res.send(json);
        } else {
          return Promise.reject({
            status: response.status,
            statusText: response.statusText
          })
        }
      })
    )
    .catch(error => {
      if (error.status === 404) {
        // do something about 404
      }
    })


});

module.exports = router;
