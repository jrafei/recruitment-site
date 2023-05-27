var db = require('./db.js');
module.exports = {
    read: function (email, callback) {
        db.query("select * from Users where email= ?", email, function
            (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    //read all users
    readall: function (callback) {
        db.query("select * from Users", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    //read all recruiters
    readallrecruiters: function (callback) {
        db.query("select * from Users where type='recruteur' ", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    //read all candidats
    readallcandidats: function (callback) {
        db.query("select * from Users where type='candidat' ", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    //read all admins
    readalladmins: function (callback) {
        db.query("select * from Users where type='admin' ", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    areValid: function (email, password, callback) {
        sql = "SELECT motdepasse FROM Users WHERE email = ?";
        rows = db.query(sql, email, function (err, results) {
            if (err) throw err;
            if (rows.length == 1 && rows[0].pwd === password) {
                callback(true)
            } else {
                callback(false);
            }
        });
    },
     creat: function (email, nom, prenom, pwd, tel, type, callback) {
        sql = "INSERT INTO Users (dateCreation, email, motdepasse, nom, prenom, organisation, premierRecruteur, statut, telephone, type) VALUES ('?', '?', '?', '?', '?', '?', '?', '?', '?', '?')";
        dateCreation = Date.now(),
        rows = db.query(sql, dateCreation, email, pwd, nom, prenom, NULL, False, True, tel, candidat, function (err, results) {
            if (err) throw err;
            if (rows.length == 1 && rows[0].pwd === password) {
                    callback(true)
            } else {
               callback(false); 
            }
            })
    }
}

