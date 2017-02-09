'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user');
const OAuth = require('./oauth');
const searchSettings = require('./searchSettings');
const categories = require('./categories');

OAuth.hasOne(User);
User.hasOne(searchSettings);

module.exports = {User, searchSettings, categories};
