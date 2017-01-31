'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');

const searchSettings = db.define('searchSettings', {
  
  price: {
    type: Sequelize.INTEGER
  }, 
  stars: {
    type: Sequelize.INTEGER
  }, 
  radius: {
    type: Sequelize.INTEGER,
    defaultValue: 5
  },
  categories: {
    type: Sequelize.ARRAY(Sequelize.STRING), 
    
  }

  //possible instance methods to expand radius if no restaurants returned?
 

  // We support oauth, so users may or may not have passwords.
 
});



module.exports = searchSettings;