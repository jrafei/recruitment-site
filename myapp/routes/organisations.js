var express = require('express');
var router = express.Router();
var userModel = require('../model/organisations.js');
var db = require('../model/db.js');


/* GET organisation listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/organisationslist', function (req, res, next) {
  result=userModel.readall(function(result){
    res.render('orgasList', { title: 'Liste des organisations', orgas:result });
  });});

  router.get('/devenirRecruteur', function (req, res, next) {
    res.render('devenirRecruteur');
  });

  router.get('/joinorga', function (req, res, next) {
    result=userModel.readallvalid(function(result){
      res.render('rejoindreOrga', { title: 'Liste des organisations', orgas:result });
    });});


    router.post('/sendjoinorga', function (req, res, next) {
      const siren = req.body.siren;
    
      sql = "INSERT INTO Demandes (orga, emailusers) VALUES (?, ?)";
      
      var DemandToInsert = [siren, req.session.username];
    
      rows = db.query(sql, DemandToInsert , function (err, results) {
              if (err) throw err;
                    res.render('orgasList', { title: 'Votre demande d\'ajout a été réalisée avec succès', orgas : DemandToInsert});
             
          });   
      });



  router.post('/addorga', function (req, res, next) {
    const nom = req.body.nom;
    const siren = req.body.siren;
    const type = req.body.type;
    const siege = req.body.siege;
  
    sql = "INSERT INTO Organisation (nom, siren, type, siegeSocial) VALUES (?, ?, ?, ?)";
    
    var orgaToInsert = [nom, siren, type, siege];
  
    rows = db.query(sql, orgaToInsert , function (err, results) {
            if (err) throw err;
            sql = "INSERT INTO Demandes (emailusers, orga) VALUES (?, ?)";
            rows = db.query(sql, [req.session.username, nom] , function (err, results) {
                  res.render('orgasList', { title: 'Votre demande d\'ajout a été réalisée avec succès', infos : orgaToInsert});
            });
        });   
    });
  
  module.exports = router;