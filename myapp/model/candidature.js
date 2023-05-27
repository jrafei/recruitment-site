var db = require('./db.js');
module.exports = {
    read: function (id, email, callback) {
        db.query("select * from Candidature idOffre= ? AND email = ?", id, email, function
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

