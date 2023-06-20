var db = require('./db.js');
module.exports = {
    //read by id 
    read: function (id, callback) {
        db.query("select * from Offres where id= ?", id, function
            (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    
    //affiche toutes les offres dans un lieu
    readbyLieu : function (lieu, callback) {
        db.query("select * from Offres of join FichePoste fp on of.id_fiche = fp.id where fp.lieu= ?", lieu, function
            (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    //affiche toutes les offres d'une orga
    readbyLieu : function (nomOrga, callback) {
        db.query("select of.* from Offres of join Users user on of.recruteur = user.email join Organisation org on user.organisation = org.SIREN where org.nom= ?", nomOrga, function
            (err, results) {
            if (err) throw err;
            callback(results);
        });
    },  

    readall: function (callback) {
        db.query("select * from Offres", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readOffreFiche: function (callback) {
        db.query("select fp.*, of.*,org.nom from Offres of join FichePoste fp on of.id_fiche = fp.id join Users u on u.email = of.recruteur join Organisation org on org.SIREN = u.organisation ", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readbyRecruteur: function(email,callback){
        db.query("select fp.*, of.* from Offres of , FichePoste fp where of.id_fiche = fp.id and of.recruteur =?", [email],function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    
    readOffrebyFiche: function(idfiche,callback){
        db.query("select of.id from Offres of, FichePoste fp where of.id_fiche = fp.id and fp.id=?"
        ,[idfiche], function (err, results) {
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

