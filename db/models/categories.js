'use strict'

const Sequelize = require('sequelize');
const db = require('APP/db');

const categories = db.define('categories', {

  title: {
    type: Sequelize.STRING
  }
});

module.exports = categories;
