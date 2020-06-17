require('dotenv').config();
var users = require("../models/users");
var migration = {};

migration.task = function() {
    users.migration();
};

migration.task();
