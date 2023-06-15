var express = require('express');
var router = express.Router();
var offresModel = require('../model/offres.js');
/*
var userModel = require('../model/offres.js');
var offresModel = require('../model/offres.js');
var ficheModel = require('../model/ficheposte.js');
var candModel = require('../model/candidature.js');
var orgaModel = require('../model/organisations.js');
*/

router.get('/', function(req, res, next) {
  console.log("router.get('/') de recruteur.js")
  res.render('accueilRecruteur');
});

router.get('/mesOffres', function(req,res,next){
    console.log(req.session.userid)
    offresModel.readbyRecruteur(req.session.userid,function(result){
    console.log(result)
    res.render('mesOffres',{offres: result});
})
});



  
module.exports = router;