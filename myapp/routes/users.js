var express = require('express');
var router = express.Router();
var userModel = require('../model/users.js');
var offresModel = require('../model/offres.js');
var ficheModel = require('../model/ficheposte.js');
var candModel = require('../model/candidature.js');
var orgaModel = require('../model/organisations.js');
var db = require('../model/db.js');



router.get('/', function (req, res, next) {
  result = ficheModel.readall(function (result) {
    res.render('accueilUser', { title: 'List des fiches de poste', fiches: result });
  });
});

router.get('/mesCandidatures', function (req, res, next) {
  result = candModel.readallbyemail(req.session.userid, function (result) {
    res.render('mesCandidatures', { title: 'List des candidats', candidatures: result });
  });
});


router.get('/devenirRecruteur', function (req, res, next) {
  res.render('devenirRecruteur');
});

/*
/* GET users listing. */
router.get('/userslist', function (req, res, next) {
  result = userModel.readall(function (result) {
    res.render('usersList', { title: 'List des utilisateurs', users: result });
  });
});

/* GET recruiters listing. */
router.get('/recruiterslist', function (req, res, next) {
  result = userModel.readallrecruiters(function (result) {
    res.render('recruitersList', { title: 'List des recruteurs', recruiters: result });
  });
});

/* GET candidats listing. */
router.get('/candidatslist', function (req, res, next) {
  result = userModel.readallcandidats(function (result) {
    res.render('candidatsList', { title: 'List des candidats', candidats: result });
  });
});

/* GET admins listing. */
router.get('/adminslist', function (req, res, next) {
  result = userModel.readalladmins(function (result) {
    res.render('adminsList', { title: 'List des administrateurs', admins: result });
  });
});


router.get('/devenirAdmin', function (req, res, next) {

  if (req.session.role != "admin") {
    res.render('devenirAdmin');
  }
  else
    res.redirect("http://localhost:3000/users/");
});


router.post('/askforadmin', function (req, res, next) {

  sql = "INSERT INTO DemandesAdmin (emailusers) VALUES (?)";

  rows = db.query(sql, req.session.userid, function (err, results) {

    if (err) throw err;
    res.render('display', { message: 'Votre demande a été réalisée avec succès' });
  });
});

router.post('/logout', function (req, res, next) {
  deleteSession(req.session);
  console.log("test")
});


/*Get upload page 
router.get('/upload',function(req, res, next) {
  console.log(req.query.idFiche);
  //res.redirect('fiche_upload',{idFiche: req.query.idFiche, intitule: req.query.intitule, email: req.session.userid,prenom: req.session.prenom });
  const idFiche = req.query.idFiche;
  const idIntitule = req.query.intitule;
  res.redirect('/upload?idFiche=${idFiche}&intitule=${idIntitule}')
});
*/

module.exports = router;