var db = require("../connect_my");

let sql = `CREATE TABLE IF NOT EXISTS users
(
    id int NOT NULL AUTO_INCREMENT,
    username VARCHAR(8),
    password VARCHAR(8),
    PRIMARY KEY (id)
)`;
db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
});

db.end();
