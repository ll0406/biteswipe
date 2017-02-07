'use strict'

const db = require('APP/db')
const User = db.model('users')

const {selfOnly, forbidden} = require('./auth.filters')

module.exports = require('express').Router()
	.get('/', forbidden('only admins can list users'), (req, res, next) => 
		User.findAll()
		.then(users => res.json(users))
		.catch(next))
	.post('/', forbidden('only admins can create new users'), (req, res, next) =>
		User.create(req.body)
		.then(user => res.status(201).json(user))
		.catch(next))
	.get('/:id', selfOnly('view'), (req, res, next) => 
		User.findById(req.params.id)
		.then(user => res.json(user))
		.catch(next))