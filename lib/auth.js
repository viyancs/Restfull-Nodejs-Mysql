require('dotenv').config();
var crypto = require('crypto');
var fs = require('fs'); //this is for store session , not recomended way better using redis for memory optimazation

var auth = {};
auth.checkAuth = function(key) {
    let status = auth.getKey(key);
    if (!status) return false;
    return true;
};
auth.setKey =  function(usr,pwd) {
    const seed = usr + process.env.SEED_KEY + pwd;
    const hash = crypto.createHash('sha256').update(seed).digest('base64');
    //save seeion to file
    fs.writeFile("cache/"+hash, "whatever", function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file session created!");
    });
    return hash;
};
auth.getKey =  function(key) {
    fs.access("cache/"+key, error => {
        if (!error) {
            return true;
        } else {
            return false;
        }
    });
};

module.exports = auth;
