'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');

const category = db.define('categories', {
  title: {
    type: Sequelize.STRING
  },
  alias: {
  	type: Sequelize.STRING
  }
});

module.exports = category;
