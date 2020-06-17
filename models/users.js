var db = require("../connect_my");
var users = {};
const tableName = 'users';

users.migration = function() {

    var sql = `CREATE TABLE IF NOT EXISTS `+ tableName +`
    (
        id int NOT NULL AUTO_INCREMENT,
        username VARCHAR(8),
        password VARCHAR(255),
        PRIMARY KEY (id)
    )`;

    db.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log("users Table executed");
    });
}

users.add = function(params) {
    return new Promise(resolve => {
        var sql = `INSERT INTO `+ tableName +` VALUES (null,"` + params.username + `", "`+ params.password +`")`;
        db.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                resolve(false);
            }
            resolve(result);
        });
    });

}

users.getUserByUsername = function(username) {
    return new Promise(resolve => {
        var sql = `select id from `+ tableName +` where username = "`+ username +`"`;
        db.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                resolve(false);
            }
            resolve(result);
        });
    });
}

module.exports = users;
