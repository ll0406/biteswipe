'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');

// possible instance methods to expand radius if no restaurants returned?
// We support oauth, so users may or may not have passwords.

const searchSettings = db.define('searchSettings', {

  priceRange: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  radius: {
    type: Sequelize.INTEGER,
    defaultValue: 8050
  },
  categories: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  }

});

module.exports = searchSettings;
