var express = require('express');
var router = express.Router();
var pieceModel = require('../model/pieces.js');

/* GET organisation listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/pieceslist', function (req, res, next) {
  result=pieceModel.readall(function(result){
    res.render('piecesList', { title: 'List des pieces', pieces:result });
  });});
  
  module.exports = router;