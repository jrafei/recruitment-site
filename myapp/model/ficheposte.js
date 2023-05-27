var db = require('./db.js');
module.exports = {
    //afficher le poste d'un id
    read: function (id, callback) {
        db.query("select * from FichePoste where id= ?", id, function
            (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    //afficher les postes d'une lieu (-> utile lorsque le candidat cherche des postes par lieu) 
    readbyLieu: function (lieu, callback) {
        db.query("select * from FichePoste where lieu= ?", lieu, function
            (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    //afficher les postes d'une typeMetier (-> utile lorsque le candidat cherche des postes par typeMetier) 
    readbyMetier: function (typeMetier, callback) {
        db.query("select * from FichePoste where typeMetier= ?", typeMetier, function
            (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readall: function (callback) {
        db.query("select * from FichePoste", function (err, results) {
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

