require('dotenv').config();
var mysql = require('mysql');

// uncoment this console.log to trace env environment was work perfectly
// console.log("host: " + process.env.DB_HOST);
// console.log("user: " + process.env.DB_USER);
// console.log("password: " + process.env.DB_PASS);
// console.log("database: " + process.env.DB_NAME);

var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database : process.env.DB_NAME
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = db;
