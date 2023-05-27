var express = require('express');
var router = express.Router();
var ficheModel = require('../model/ficheposte.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/fichespostelist', function (req, res, next) {
  result=ficheModel.readall(function(result){
    res.render('fichesposteList', { title: 'List des fiches de poste', fiches:result });
  });});
  
  module.exports = router;