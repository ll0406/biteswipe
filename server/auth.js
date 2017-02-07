const app = require('APP'), {env} = app;
const debug = require('debug')(`${app.name}:auth`);
const passport = require('passport');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('APP/db/models/user');
const OAuth = require('APP/db/models/oauth');
const auth = require('express').Router();
const {authenticateRefreshToken, generateRefreshToken, generateAccessToken, respondWithTokens, redirectWithTokens, respondWithUser} = require('./token');

OAuth.setupStrategy({
  provider: 'facebook',
  strategy: require('passport-facebook').Strategy,
  config: {
    clientID: env.FACEBOOK_CLIENT_ID,
    clientSecret: env.FACEBOOK_CLIENT_SECRET,
    callbackURL: env.FACEBOOK_CALLBACK
  },
  passport
})

OAuth.setupStrategy({
  provider: 'google',
  strategy: require('passport-google-oauth').OAuth2Strategy,
  config: {
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: env.GOOGLE_CALLBACK
  },
  passport
})

OAuth.setupStrategy({
  provider: 'twitter',
  strategy: require('passport-twitter').Strategy,
  config: {
    consumerKey: env.TWITTER_CONSUMER_KEY,
    consumerSecret: env.TWITTER_CONSUMER_SECRET,
    callbackURL: env.TWITTER_CALLBACK
  },
  passport
})

// Used only for OAuth strategies
passport.serializeUser((user, done) => {
  debug('will serialize user.id=%d', user.id)
  done(null, user.id)
  debug('did serialize user.id=%d', user.id)
})

passport.deserializeUser(
  (id, done) => {
    debug('will deserialize user.id=%d', id)
    User.findById(id)
      .then(user => {
        debug('deserialize did ok user.id=%d', user.id)
        done(null, user)
      })
      .catch(err => {
        debug('deserialize did fail err=%s', err)
        done(err)
      })
  }
)

passport.use(new (require('passport-local').Strategy) (
  (email, password, done) => {
    debug('will authenticate user(email: "%s")', email)
    User.findOne({where: {email}})
      .then(user => {
        if (!user) {
          debug('authenticate user(email: "%s") did fail: no such user', email)
          return done(null, false, { message: 'Login incorrect' })
        }
        return user.authenticate(password)
          .then(ok => {
            if (!ok) {
              debug('authenticate user(email: "%s") did fail: bad password')              
              return done(null, false, { message: 'Login incorrect' })
            }
            debug('authenticate user(email: "%s") did ok: user.id=%d', user.id)
            done(null, user)
          })
      })
      .catch(done)
  }
))

auth.post('/local/login', passport.authenticate('local', {session: false}), generateRefreshToken, generateAccessToken, respondWithTokens)

auth.get('/:strategy/login', (req, res, next) => passport.authenticate(req.params.strategy, {scope: ['email']})(req, res, next))

auth.get('/:strategy/callback', (req, res, next) => passport.authenticate(req.params.strategy)(req, res, next), generateRefreshToken, generateAccessToken, redirectWithTokens)

auth.post('/signup', (req, res, next) => {
  User.create(req.body)
  .then(user => {
    if(!user) res.sendStatus(404)
    else {
      req.user = user;
      next();
    }
  })
  .catch(next)
}, generateRefreshToken, generateAccessToken, respondWithTokens)

auth.post('/logout', (req, res, next) => {
  User.update({refresh_token: ''}, {where: {refresh_token: req.body.refreshToken}})
  .then(user => {
    if(!user) res.status(404).send('Invalid refresh token')
    else res.sendStatus(200)
  })
  .catch(next)
})

auth.get('/token', authenticateRefreshToken, generateAccessToken, respondWithTokens)

auth.get('/user', authenticateRefreshToken, respondWithUser)

module.exports = auth
