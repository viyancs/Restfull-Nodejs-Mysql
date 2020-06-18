require('dotenv').config();
var mysql = require('mysql');

// uncoment this console.log to trace env environment was work perfectly
// console.log("host: " + process.env.DB_HOST);
// console.log("user: " + process.env.DB_USER);
// console.log("password: " + process.env.DB_PASS);
// console.log("database: " + process.env.DB_NAME);
var dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database : process.env.DB_NAME
};

var db;

function manageConnection() {
    db = mysql.createConnection(dbConfig);

    db.connect(function(err) {
        if(err) {
            console.log('error when connecting to db:', err);
            setTimeout(manageConnection, 2000);
        }
    });

    db.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            manageConnection();
        } else {
            throw err;
        }
    });
}


manageConnection();

module.exports = db;
