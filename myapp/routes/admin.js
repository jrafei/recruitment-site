var express = require('express');
var router = express.Router();
var userModel = require('../model/users.js');
var offresModel = require('../model/offres.js');
var ficheModel = require('../model/ficheposte.js');
var demandesModel = require('../model/demandes.js');
var orgaModel = require('../model/organisations.js');
var db = require('../model/db.js');
var sess = require('../session.js');

/* GET users listing. */

router.get('/', function (req, res, next) {
    result = ficheModel.readall(function (result) {
        res.render('accueilUser', { title: 'List des fiches de poste', fiches: result });
    });
});


router.get('/userslist', function (req, res, next) {
    userModel.readall(function (result) {
        orgaModel.readall(function (org) {
            res.render('usersList', { title: 'Liste des utilisateurs', users: result, orgas: org });
        });
    });
});


router.post('/setuser', function (req, res, next) {

    if (req.body.modifier) {
        const nom = req.body.nom;
        const prenom = req.body.prenom;
        const tel = req.body.tel;
        const statut = req.body.statut;
        const organisation = req.body.organisation;
        const type = req.body.type;

        var modifText = ["nom", "prenom", "telephone", "statut", "organisation", "type"];
        var modif = [nom, prenom, tel, statut, organisation, type];
        var toModif = [];
        var sql = "UPDATE Users SET ";
        var i = 0;
        for (const el of modif) {
            if (el) {
                sql += `${modifText[i]} = ?, `;
                toModif.push(el);
            }
            i++;
        }
        sql = sql.slice(0, -2); // Remove the extra comma and space at the end
        sql += " WHERE email = ?";
        toModif.push(req.body.email);

        rows = db.query(sql, toModif, function (err, results) {
            console.log(rows);
            if (err) throw err;
            userModel.readall(function (result) {
                orgaModel.readall(function (org) {
                    res.render('usersList', { title: 'Liste des utilisateurs', users: result, orgas: org });
                });
            });
        });
    }



    if (req.body.supprimer) {
        sql = "DELETE FROM Users WHERE email = ?";
        rows = db.query(sql, [req.body.emailToDelete], function (err, results) {
            if (err) throw err;
            userModel.readall(function (result) {
                orgaModel.readall(function (org) {
                    res.render('usersList', { title: 'Liste des utilisateurs', users: result, orgas: org });
                });
            });
        });
    }

});



router.get('/adminjoin', function (req, res, next) {
    demandesModel.readAdmin(function (result) {
        res.render('AdminJoin', { title: 'Liste des utilisateurs demandant à devenir Admin', users: result });
    });
});

router.post('/setadminjoin', function (req, res, next) {

    if (req.body.accepter) {
        var user = req.body.emailA
        sql = "UPDATE DemandesAdmin SET traitement = 1, reponse = 1 WHERE emailusers = ?";
        rows = db.query(sql, [user], function (err, results) {
            if (err) throw err;
            demandesModel.readAdmin(function (result) {
                res.render('AdminJoin', { title: 'Liste des utilisateurs demandant à devenir Admin', users: result });
            });
        });
    }

    if (req.body.rejeter) {
        var user = req.body.emailR
        sql = "UPDATE DemandesAdmin SET traitement = 1, reponse = 0 WHERE emailusers = ?";
        rows = db.query(sql, [user], function (err, results) {
            if (err) throw err;
            demandesModel.readAdmin(function (result) {
                res.render('AdminJoin', { title: 'Liste des utilisateurs demandant à devenir Admin', users: result });
            });
        });
    }


});




module.exports = router;
