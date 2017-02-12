'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');

const SearchSettings = db.define('searchSettings', {
  priceRange: {
    type: Sequelize.ARRAY(Sequelize.INTEGER), 
    defaultValue: [1,2,3,4]
  },
  radius: {
    type: Sequelize.INTEGER,
    defaultValue: 8047
  },
  categories: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: ['pizza', 'newamerican', 'italian', 'chinese', 'sushi', 'mexican', 'burgers', 'indpak']
  }
});

module.exports = SearchSettings;
