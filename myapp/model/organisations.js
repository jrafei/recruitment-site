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

    readalluserswaitingforvalidation: function (callback, result) {     
        db.query("select o.SIREN from Demands d Join Users on d.emailusers = request.session.userid Join Organisation o ON d.orga = o.SIREN;", function (err, results) {
            if (err) throw err;
            var siren = result[0];
            db.query("select * from DemandesJoin WHERE d.traitement = 0 and d.orga =  ?;", [siren], function (err, results) {
                if (err) throw err;
                callback(results);
            });
        });
       
    },
    
}

