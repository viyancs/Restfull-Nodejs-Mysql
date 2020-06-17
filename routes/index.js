var express = require('express');
var router = express.Router();
var auth = require("../lib/auth");
require('dotenv').config();
var slug = process.env.API_SLUG;

/**
 * healthcheck
 */
router.get('/health', function(req, res, next) {
  res.send('checked');
});

/**
 * Route get all article
 */
router.get('/api/'+slug+'/users', function(req, res, next) {
  res.send('router posts');
});

/**
 * Route by id
 */
router.get('/api/'+slug+'/users/:id', function(req, res, next) {

});

/**
 * Route new
 */
router.post('/api/'+slug+'/users', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    //this validation better using library for more complex validation
    if (username.length > 8 && username.length < 4) {
        return res.status(400).json({ error: 'Username length minimum 4 max is 8 character!' });
    }

    if (password.length < 6 && password.length > 8) {
        return res.status(400).json({ error: 'Password length minimum 6 max is 8 character!' });
    }

    // must be store in DB
    auth.setKey(username,password);
    return res.status(200).json({ success: 'Register Success' });
});

/**
 * Route update
 */
router.put('/'+slug+'/users/:id', isAuthenticated,function(req, res, next) {

});

/**
 * Route delete
 */
router.delete('/api/'+slug+'/users/:id', isAuthenticated,function(req, res, next) {

});


// if the user is authenticated
function isAuthenticated(req, res, next) {
    // check if client sent auth header
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
    }

    //check to db for validating  existing user
    if (!auth.checkAuth()) {
        return res.status(403).json({ error: "Not Authorized" });
    }
    //res.status(403).send({ error: "Not Authorized" });
    next();
}

module.exports = router
