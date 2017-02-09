'use strict'

const db = require('APP/db');
const api = module.exports = require('express').Router();
const {authenticateAccessToken} = require('./token');

api
  .get('/heartbeat', (req, res) => res.send({ok: true}))
  .use('/auth', require('./auth'))
  .use(authenticateAccessToken)
  .use('/users', require('./users'))
  .use('/restaurants', require('./restaurants'))
  .use('/searchSettings', require('./searchSettings'))
  .use('/categories', require('./categories'));

// No routes matched? 404.
api.use((req, res) => res.status(404).end());
