var mysql = require("mysql");

var pool = mysql.createPool({
    host: "tuxa.sme.utc", //ou localhost
    user: "ai16p054", //"ai16p002",
    password: "89PRl9zx2fnh",//'pzT76bJadOfPduAV',
    database: "ai16p054"//"ai16p002"
});

module.exports = pool; 

