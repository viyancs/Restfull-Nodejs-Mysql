var users = require('../models/users.js');
var auth = require("../lib/auth");

exports.create = async function(req, res, next) {
    var usr = req.body.username;
    var passwd = req.body.password;
    var email = req.body.email;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var address = req.body.address;
    var country = req.body.country;

    if (typeof email == 'undefined') email = null;
    if (typeof firstname == 'undefined') firstname = null;
    if (typeof lastname == 'undefined') lastname = null;
    if (typeof address == 'undefined') address = null;
    if (typeof country == 'undefined') country = null;

    var usersParams = {
        username:usr,
        email:email,
        password:passwd,
        firstname:firstname,
        lastname:lastname,
        address:address,
        country:country
    };

    //this validation better using library for more complex validation
    if (!validateEmail(email)) {
        return res.status(400).json({ status:'fail', data: {email:'email invalid'}});
    }

    if (usr.length > 8 && usr.length < 4) {
        return res.status(400).json({ status:'fail', data: {username:'Username length minimum 4 max is 8 character!'}});
    }

    if (passwd.length < 6 && passwd.length > 8) {
        return res.status(400).json({ status:'fail', data: {password:'Password length minimum 6 max is 8 character!'}});
    }

    var key = auth.setKey(usr,passwd);
    usersParams.password = key;
    let getUser = await users.getUserByUsername(usr);
    // check user exist
    if (getUser == -1) {
         return res.status(500).json({ status:'error', message: 'Something gone wrong when get user by username' });
    } else if (getUser.length > 0) {
         return res.status(400).json({ status:'fail',data: {username:'username is exist, please select unique username!'}});
    }
    let addUser = await users.add(usersParams);
    //check user save error or not
    if (!addUser) {
        return res.status(500).json({ status:'error', message: 'Something gone wrong when creating user' });
    }
    return res.status(200).json({ status:'success',data: addUser });
};

exports.update = async function(req, res, next) {
    var email = req.body.email;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var address = req.body.address;
    var country = req.body.country;
    var id = req.params.id;

    if (typeof email == 'undefined') email = null;
    if (typeof firstname == 'undefined') firstname = null;
    if (typeof lastname == 'undefined') lastname = null;
    if (typeof address == 'undefined') address = null;
    if (typeof country == 'undefined') country = null;

    var usersParams = {
        email:email,
        firstname:firstname,
        lastname:lastname,
        address:address,
        country:country,
        id:id
    };

    //this validation better using library for more complex validation
    if (!validateEmail(email)) {
        return res.status(400).json({ status:'fail', data: {email:'email invalid'}});
    }
    let checkUser = await users.getById(id);
    if (checkUser.length <= 0) {
        return res.status(500).json({ status:'error', message: 'User not found' });
    }

    let updateUser = await users.update(usersParams);
    //check user save error or not
    if (!updateUser) {
        return res.status(500).json({ status:'error', message: 'Something gone wrong when updating user' });
    }
    return res.status(200).json({ status:'success',data: updateUser });
};

exports.delete = async function(req, res, next) {
    var id = req.params.id;
    let checkUser = await users.getById(id);
    if (checkUser.length <= 0) {
        return res.status(500).json({ status:'error', message: 'User not found' });
    }
    let deleteUser = await users.delete(id);
    //check user save error or not
    if (!deleteUser) {
        return res.status(500).json({ status:'error', message: 'Something gone wrong when deleting user' });
    }
    return res.status(200).json({ status:'success',data: deleteUser });
};

exports.getById = async function(req, res, next) {
    var id = req.params.id;
    var user = await users.getById(id);
    if (user.length <= 0) {
        return res.status(500).json({ status:'error', message: 'User not found' });
    }
    return res.status(200).json({ status:'success', data: user });
};

exports.auth = async function(req, res, next) {
    var usr = req.body.username;
    var passwd = req.body.password;
    var key = auth.setKey(usr,passwd);
    var getUser = await users.getUserByKey(key);
    if (getUser == -1) {
        return res.status(500).json({ status:'error', message: 'Something gone wrong when get user by key' });
    } else if(getUser.length == 0) {
        return res.status(500).json({ status:'error', message: 'Not Authorized' });
    } else if(getUser.length > 0) {
        console.log('usr = ' + getUser[0].password);
        return res.status(200).json({ status:'success',data: {token:getUser[0].password} });
    }
    return res.status(200).json({ status:'success',data: 'Unhandled' });
};

exports.getAll = async function(req, res, next) {
    var getAllUser = await users.getAll();
    console.log(getAllUser);
    if (getAllUser == -1) {
        return res.status(500).json({ status:'error', message: 'Something gone wrong when get All user' });
    } else if(getAllUser.length == 0) {
        return res.status(200).json({ status:'success', data: []});
    } else if(getAllUser.length > 0) {
        console.log('all user = ' + getAllUser);
        return res.status(200).json({ status:'success',data: getAllUser});
    }
};

//validation function
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
