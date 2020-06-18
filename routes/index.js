var express = require('express');
var router = express.Router();
var auth = require("../lib/auth");
require('dotenv').config();
var slug = process.env.API_SLUG;
var usersController = require('../controllers/users.js');

/**
 * healthcheck
 */
router.get('/health', function(req, res, next) {
    console.log('checked');
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
 * Route new / registration
 */
router.post('/api/'+slug+'/users', usersController.create);

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
