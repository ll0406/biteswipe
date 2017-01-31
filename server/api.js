'use strict'

const db = require('APP/db');
const api = module.exports = require('express').Router();

const authenticateAccessToken = (req, res, next) => {

  const header = req.headers['authorization']
  if(!header) res.status(404).send('Authorization header not found')

  const accessToken = req.headers['authorization'].replace('Bearer ', '')
  if(accessToken) res.status(404).send('Access token not found')

  const id = jwt.verify(accessToken, env.SERVER_SECRET)
  User.findById(id)
  .then(user => {
    if(!user) res.sendStatus(404);
    req.user = user;
    next();
  })
  .catch(next);
};

api
  .get('/heartbeat', (req, res) => res.send({ok: true,}))
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))
  .use('/restaurants', require('./restaurants'));

// No routes matched? 404.
api.use((req, res) => res.status(404).end());