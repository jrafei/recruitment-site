var express = require('express');
var router = express.Router();
var candModel = require('../model/candidature.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/candidatureslist', function (req, res, next) {
  result=candModel.readall(function(result){
    res.render('candidaturesList', { title: 'List des candidats', candidats:result });
});});


router.get('/mesCandidatures', function (req, res, next) {
  result=candModel.readallbyemail(req.session.email,function(result){
  res.render('mesCandidatures', { title: 'List des candidats', candidats:result });
});});

module.exports = router;