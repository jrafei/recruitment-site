var express = require('express');
var router = express.Router();
var demandeModel = require('../model/demandes.js');

/* GET demandes listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/demandeslist', function (req, res, next) {
  result=demandeModel.readall(function(result){
    res.render('demandesList', { title: 'List des demandes', demandes:result });
  });});

  router.get('/demandeslist', function (req, res, next) {
    result=demandeModel.readActive(function(result){
      res.render('demandesList', { title: 'List des demandes non traitées', demandes:result });
    });});

  
  module.exports = router;