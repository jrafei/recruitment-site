var express = require('express');
var app = express();
var router = express.Router();
var userModel = require('../model/users.js');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
var db = require('../model/db.js');


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET Inscription Form */

router.get('/inscription', function (req, res, next) {
     res.render('inscription', { title: 'Formulaire inscription' });
   });


/* POST Inscription Form */


router.post('/inscriptionInfos', function (req, res, next) {
  const email = req.body.email
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const pwd = req.body.password;
  const tel = req.body.tel;
  const type = "candidat";

  sql = "INSERT INTO Users (dateCreation, email, motdepasse, nom, prenom, telephone, type) VALUES (?, ?, ?, ?, ?, ?, ?)";

   const timeElapsed = Date.now();
   const dateCreation = new Date(timeElapsed);
  
  var userToInsert = [dateCreation, email, pwd, nom, prenom, tel, 'candidat'];

  rows = db.query(sql, userToInsert , function (err, results) {
          if (err) throw err;
          res.render('inscriptionInfos', { title: 'Formulaire Saisi', infos : test});
      })   
  });
  
  router.get('/inscriptionInfos', function (req, res, next) {
    res.render('inscriptionInfos', { title: 'Formulaire Saisi', infos : test});
});

  module.exports = router;