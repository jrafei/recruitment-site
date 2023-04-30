var mysql = require("mysql");

var pool = mysql.createPool({
    host: "tuxa.sme.utc", //ou localhost
    user: "ai16p002",
    password: "webAI16!",
    database: "ai16p002"
});

module.exports = pool; 