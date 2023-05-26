var express = require('express');
var router = express.Router();
var userModel = require('../model/organisations.js');

/* GET organisation listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/organisationslist', function (req, res, next) {
  result=userModel.readall(function(result){
    res.render('orgasList', { title: 'List des organisations', orgas:result });
  });});
  
  module.exports = router;