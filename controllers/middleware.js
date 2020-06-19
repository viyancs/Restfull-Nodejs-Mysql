var auth = require("../lib/auth");
var middleware = {};

// if the user is authenticated
middleware.isAuthenticated = async function(req, res, next) {
    // check if client sent auth header
    if (!req.headers.authorization) {
        return res.status(403).json({ status:'error', message: 'No Token Sent!' });
    }

    //check to db for validating  existing user
    console.log(req.headers.authorization);
    var credentials = req.headers.authorization;
    token = credentials.split(" ");
    console.log(token);
    var session = await auth.checkAuth(token[1]);
    if (!session) {
        return res.status(403).json({ status:'error', message: 'Not Authorized' });
    }
    next();
}

module.exports = middleware;
