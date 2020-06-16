var express = require('express');
var router = express.Router();
require('dotenv').config();
var slug = process.env.API_SLUG;

/**
 * Route get all article
 */
router.get('/api/'+slug+'/', function(req, res, next) {
  res.send('router posts');
});

/**
 * Route by id
 */
router.get('/api/'+slug+'/:id', function(req, res, next) {

});

/**
 * Route new
 */
router.post('/api/'+slug+'/', function(req, res, next) {

});

/**
 * Route update
 */
router.put('/'+slug+'/:id', function(req, res, next) {

});

/**
 * Route delete
 */
router.delete('/api/'+slug+'/:id', function(req, res, next) {

});

module.exports = router
