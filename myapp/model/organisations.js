var db = require('./db.js');
module.exports = {
    read: function (SIREN, callback) {
        db.query("select * from Organisation SIREN= ?", SIREN, function
            (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readall: function (callback) {
        db.query("select * from Organisation", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readallvalid: function (callback) {
        db.query("select * from Organisation o JOIN Demandes d on d.orga = o.SIREN WHERE d.reponse = 1 ", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readallwaitingforvalidation: function (callback) {
        db.query("select * from Organisation o JOIN Demandes d on d.orga = o.SIREN WHERE d.traitement = 0 ;", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readalluserswaitingforvalidation: function (req,callback, result) {     
        db.query("select organisation from Users WHERE email = ? AND premierRecruteur = 1;",[req.session.userid], function (err, results) {
            if (err) throw err;
            var siren = results[0].organisation;
            db.query("select * from DemandesJoin WHERE traitement = 0 and orga =  ?;", [siren], function (err, results) {
                if (err) throw err;
                callback(results);
            });
        });
       
    },
    
}

