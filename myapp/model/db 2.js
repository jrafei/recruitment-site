var mysql = require("mysql");

var pool = mysql.createPool({
    host: "tuxa.sme.utc", //ou localhost
    user: "ai16p002",
    password: "sVq7K6JBwthp",
    database: "ai16p002"
});

module.exports = pool;