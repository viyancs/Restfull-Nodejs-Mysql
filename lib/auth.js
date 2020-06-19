require('dotenv').config();
var crypto = require('crypto');
var users = require('../models/users.js');
var fs = require('fs'); //this is for store session , not recomended way better using redis for memory optimazation

var auth = {};
auth.checkAuth = async function(key) {
    var usr = await users.getUserByKey(key);
    if (typeof usr[0] == 'undefined') return false;
    if (typeof usr[0].password == 'undefined') return false;
    if (usr[0].password != '' || usr[0].password != null ) return true;
    return false;
};
auth.setKey =  function(usr,pwd) {
    const seed = usr + process.env.SEED_KEY + pwd;
    const hash = crypto.createHash('sha256').update(seed).digest('base64');
    //save seeion to file for testin only
    // fs.writeFile("cache/"+hash, "whatever", function(err) {
    //     if(err) {
    //         return console.log(err);
    //     }
    //     console.log("The file session created!");
    // });
    return hash;
};


module.exports = auth;
