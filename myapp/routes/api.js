var express = require('express');
var router = express.Router();
var offreModel = require('../model/offres.js');
var usersModel = require('../model/users.js');
router.get('/offres', function (req, res, next) { 
        result=offreModel.readall(function(result){
              res.status(200).json(result);
        }); });

router.get('/users', function (req, res, next) { 
      usersModel.readall(function(result){
      res.status(200).json(result);
      }); });


module.exports = router;