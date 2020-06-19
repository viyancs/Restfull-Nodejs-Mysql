var db = require("../connect_my");
var users = {};
const tableName = 'users';

users.migration = function() {

    var sql = `CREATE TABLE IF NOT EXISTS `+ tableName +`
    (
        id int NOT NULL AUTO_INCREMENT,
        username VARCHAR(8),
        email VARCHAR(100),
        password VARCHAR(255),
        firstname VARCHAR(10),
        lastname VARCHAR(10),
        address TEXT,
        country VARCHAR(100),
        status int(1),
        PRIMARY KEY (id)
    )`;

    db.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log("users Table executed");
    });

    return true;
}

users.add = function(params) {
    return new Promise(resolve => {
        var sql = `INSERT INTO `+ tableName +` VALUES (null,"` + params.username + `", "`+ params.email +`", "`+ params.password +`", "`+ params.firstname +`", "`+ params.lastname +`", "`+ params.address +`", "`+ params.country +`",0)`;
        db.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                resolve(false);
            }
            resolve(result);
        });
    });

}

users.update = function(params) {
    return new Promise(resolve => {
        var sql = `UPDATE `+ tableName +` set email="` + params.email + `",firstname="`+ params.firstname + `",lastname="`+ params.lastname + `",address="`+ params.address + `",country="`+ params.country +`" where id=` + params.id;
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
                resolve(-1);
            }
            resolve(result);
        });
    });
}

users.getUserByKey = function(authKey) {
    return new Promise(resolve => {
        var sql = `select password from `+ tableName +` where password = "`+ authKey +`"`;
        db.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                resolve(-1);
            }
            resolve(result);
        });
    });
}

users.getAll = function() {
    return new Promise(resolve => {
        var sql = `select id,username,email,firstname,lastname,address,country from ` + tableName ;
        db.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                resolve(-1);
            }
            resolve(result);
        });
    });
}

users.getById = function(id) {
    return new Promise(resolve => {
        var sql = `select id,username,email,firstname,lastname,address,country from ` + tableName + ` where id=` + id;
        db.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                resolve(-1);
            }
            resolve(result);
        });
    });
}

users.delete = function(id) {
    return new Promise(resolve => {
        var sql = `DELETE from  ` + tableName + ` where id=` + id;
        db.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                resolve(-1);
            }
            resolve(result);
        });
    });
}

module.exports = users;
