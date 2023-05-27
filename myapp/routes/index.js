var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { test: 'Express' });
  });

  router.get('/inscription', function(req, res, next) {
    res.render('inscription');
  });

module.exports = router;
