var db = require('./db.js');
module.exports = {
    read: function (id, email, callback) {
        db.query("select * from Candidature where idOffre= ? AND email = ?", id, email, function
            (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readall: function (callback) {
        db.query("select * from Candidature", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readallbyemail: function (email, callback) {
        db.query("select of.*, fp.*, cand.* from Candidature cand , Offres of, FichePoste fp where cand.idOffre = of.id and of.id_fiche = fp.id and cand.email = ?", [email], function
            (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readbyEmailIdOffre : function (email,idOffre,callback) {
        db.query("select * from Candidature where email = ? and idOffre = ?",[email,idOffre], function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readbyEmailIdFiche: function(email,idFiche,callback){
        db.query("select * from Candidature c, Offres of where of.id=c.idOffre and email = ? and id_fiche = ?",[email,idFiche], function (err, results) {
            if (err) throw err;
            callback(results);
        });
    }
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

