'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');

// possible instance methods to expand radius if no restaurants returned?
// We support oauth, so users may or may not have passwords.

const searchSettings = db.define('searchSettings', {

  priceRange: {
    type: Sequelize.ARRAY(Sequelize.INTEGER), 
    defaultValue: [1,2,3,4]
  },
  radius: {
    type: Sequelize.INTEGER,
    defaultValue: 8050
  },
  categories: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: ['pizza', 'newamerican', 'italian', 'chinese', 'sushi', 'mexican', 'burgers', 'indpak']
  }

});

module.exports = searchSettings;
