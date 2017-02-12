'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user');
const OAuth = require('./oauth');
const SearchSettings = require('./searchSettings');
const Category = require('./category');

OAuth.hasOne(User);
User.hasOne(SearchSettings);

module.exports = {User, SearchSettings, Category};
