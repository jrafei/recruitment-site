var express = require('express');
var router = express.Router();
var offreModel = require('../model/offres.js');

/* GET offres listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource offre.js');
});


router.get('/offreslist', function (req, res, next) {
  result=offreModel.readall(function(result){
    res.render('offresList', { title: 'List des offres', offres : result });
  });});
  
  module.exports = router;