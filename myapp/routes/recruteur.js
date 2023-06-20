var express = require('express');
var router = express.Router();
var offresModel = require('../model/offres.js');
var candModel = require('../model/candidature.js');
var db = require('../model/db.js');
const fs = require('fs');
const path = require('path'); 

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


const mesOffres = (req,res) =>{
    offresModel.readbyRecruteur(req.session.userid,function(result){
    res.render('mesOffres',{offres: result});
})
};

 
const mesCandidats=(req,res) => {
    candModel.readbyOffre(req.query.idOffre,function(result){
        result.forEach((candidat) => {
        candidat.cvExiste = fichierExiste(`${candidat.prenom}-CV.jpg`);
        candidat.lmExiste = fichierExiste(`${candidat.prenom}-LM.jpg`);
        console.log(candidat.cvExiste)
        console.log(candidat.lmExiste)
      });
    res.render('candidats',{candidats: result})
  })
}

router.get('/mesOffres', function(req,res,next){
    mesOffres(req,res)
});

// Fonction de vérification de l'existence du fichier 
function fichierExiste(nomFichier) {
  try {
    const cheminFichier = path.join(__dirname, '../mesfichiers', nomFichier);
    console.log(cheminFichier)
    fs.accessSync(cheminFichier, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

router.get('/candidats', function(req,res){
    mesCandidats(req,res)
})



router.post('/reponse', function (req, res, next) {
  const emailCand = req.body.emailCand;
  const idOffre = req.body.idOffre;
  tomodify = []
  tomodify.push(emailCand)
  tomodify.push(idOffre)

  if (req.body.accepter) {
        sql = "UPDATE Candidature SET statutCand = 'accepté' WHERE email = ? and idOffre = ?";
        db.query(sql, tomodify, function (err, results) {
            if (err) throw err;
            sql = "UPDATE Candidature SET statutCand = 'refusé' WHERE email <> ? and idOffre = ?";
            db.query(sql, tomodify, function (err, results) {
              req.query.idOffre = idOffre
              mesOffres(req,res)
            })
        }); 
  }

  if (req.body.refuser) {
      sql = "UPDATE Candidature SET statutCand = 'refusé' WHERE email = ? and idOffre = ?";
      rows = db.query(sql, tomodify, function (err, results) {
          if (err) throw err;
             req.query.idOffre = idOffre
              mesCandidats(req,res)
          ;
        });
  };  
});


module.exports = router;