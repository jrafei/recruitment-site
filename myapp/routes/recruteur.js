var express = require('express');
var router = express.Router();
var offresModel = require('../model/offres.js');
var candModel = require('../model/candidature.js');
var db = require('../model/db.js')

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
    res.render('mesOffres',{offres: result});
})
});

const CandidatsbyOffre = (req,res)=>{
  candModel.readbyOffre(req.query.idOffre,function(result){
    res.render('candidats',{candidats: result, idOffre : req.query.idOffre})
  })
}

router.get('/candidats', function(req,res){
  CandidatsbyOffre(req,res)
})
    

router.post('/reponse', function(req, res) {
  var emailCand = req.body.emailCand;
  var idOffre = req.body.idOffre;
    var tomodif = []
    tomodif.push(emailCand)
    tomodif.push(idOffre)
  
  if (req.body.accepter) {
    var sql = "UPDATE Candidature SET statutCand = 'accepté' WHERE email = ? AND idOffre = ?"
    console.log(tomodif)
    console.log(sql)
    db.query(sql, tomodif, function (err, results) {
      sql = "UPDATE Candidature SET statutCand = 'refusé' WHERE email <> ? AND idOffre = ?"
      db.query(sql, tomodif, function (err, results) {
        if (err) throw err;
        sql = "UPDATE Offres SET etat = 'expirée' where id = ?"
        db.query(sql, [idOffre], function (err, results) {
          req.query.idOffre = idOffre;
          CandidatsbyOffre(req,res)
      });
      })
    })
  }

  if (req.body.refuser){
    var sql = "UPDATE Candidature SET statutCand = 'refusé' WHERE email = ? AND idOffre = ?"
    console.log(tomodif)
    console.log(sql)
    db.query(sql, tomodif, function (err, results) {
      db.query(sql, tomodif, function (err, results) {
          req.query.idOffre = idOffre;
          CandidatsbyOffre(req,res)
      });
      })
  }
});

  
module.exports = router;