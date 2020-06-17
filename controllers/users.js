var users = require('../models/users.js');
var auth = require("../lib/auth");

exports.create = async function(req, res, next) {
    var usr = req.body.username;
    var passwd = req.body.password;

    //this validation better using library for more complex validation
    if (usr.length > 8 && usr.length < 4) {
        return res.status(400).json({ status:'fail', data: {username:'Username length minimum 4 max is 8 character!'}});
    }

    if (passwd.length < 6 && passwd.length > 8) {
        return res.status(400).json({ status:'fail', data: {password:'Password length minimum 6 max is 8 character!'}});
    }

    var key = auth.setKey(usr,passwd);
    let getUser = await users.getUserByUsername(usr);
    // check user exist
    if (getUser == false) {
         return res.status(500).json({ status:'error', message: 'Something gone wrong when get user by username' });
    } else if (getUser.length > 0) {
         return res.status(400).json({ status:'fail',data: {username:'username is exist, please select unique username!'}});
    }
    let addUser = await users.add({username:usr,password:key});
    //check user save error or not
    if (!addUser) {
        return res.status(500).json({ status:'error', message: 'Something gone wrong when creating user' });
    }
    return res.status(200).json({ status:'success',data: addUser });
};
