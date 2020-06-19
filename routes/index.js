var express = require('express');
var router = express.Router();
var auth = require("../lib/auth");
var migration = require("../lib/migration");
require('dotenv').config();
var slug = process.env.API_SLUG;
var usersController = require('../controllers/users.js');
var middleware = require('../controllers/middleware.js');

/**
 * healthcheck
 */
router.get('/health', function(req, res, next) {
    console.log('checked');
    res.send('checked');
});

/**
 * Route migration
 */
router.get('/migration', function(req, res, next) {
    console.log('migration db..');
    var status = migration.task();
    if (!status) return res.status(500).json({ status:'error', message: 'Something gone wrong when migration' });
    return res.status(200).json({ status:'success', message: 'migration successfully' });
});

/**
 * Route login
 */
router.post('/api/'+slug+'/auth', usersController.auth);

/**
 * Route get all users
 */
router.get('/api/'+slug+'/users', middleware.isAuthenticated,usersController.getAll);

/**
 * Route by id
 */
router.get('/api/'+slug+'/users/:id',  middleware.isAuthenticated,usersController.getById);

/**
 * Route new / registration
 */
router.post('/api/'+slug+'/users', usersController.create);

/**
 * Route update
 */
router.put('/api/'+slug+'/users/:id', middleware.isAuthenticated, usersController.update);

/**
 * Route delete
 */
router.delete('/api/'+slug+'/users/:id',  middleware.isAuthenticated, usersController.delete);

module.exports = router;
