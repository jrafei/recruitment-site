var db = require('./db.js');
module.exports = {
    //afficher toutes les demandes d'un utilisateur
    read: function (email, callback) {
        db.query("select * from Demandes where emailusers= ?", email, function
            (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    //afficher toutes les demandes des utilisateurs pour une organisation
    readUsers : function(orga, callback) {
        db.query("select * from Demandes where orga= ?", orga, function
        (err,results){
            if (err) throw err;
            callback(results);
            
        });
    },

    readall: function (callback) {
        db.query("select * from Demandes", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readActive: function (callback) {
        db.query("select * from Demandes where traitement = 0", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
}

