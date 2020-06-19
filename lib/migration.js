require('dotenv').config();
var users = require("../models/users");
var migration = {};

migration.task = function() {
    var user = users.migration();
    if (!user) return false;
    return true;
};

migration.task();

module.exports = migration;
