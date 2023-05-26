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
    // areValid: function (email, password, callback) {
    //     sql = "SELECT motdepasse FROM Users WHERE email = ?";
    //     rows = db.query(sql, email, function (err, results) {
    //         if (err) throw err;
    //         if (rows.length == 1 && rows[0].pwd === password) {
    //             callback(true)
    //         } else {
    //             callback(false);
    //         }
    //     });
    // },
    // creat: function (email, nom, prenom, pwd, type, callback) {
    //     //todo
    //     return false;
    // }
}

