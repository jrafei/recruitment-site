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
    
}

