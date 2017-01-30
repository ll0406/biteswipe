const app = require('APP'), {env} = app;
const debug = require('debug')(`${app.name}:auth`);
const passport = require('passport');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const authenticate = expressJwt({secret: env.SERVER_SECRET});

const User = require('APP/db/models/user');
const OAuth = require('APP/db/models/oauth');
const auth = require('express').Router();

/*************************
 * Auth strategies
 * 
 * The OAuth model knows how to configure Passport middleware.
 * To enable an auth strategy, ensure that the appropriate
 * environment variables are set.
 * 
 * You can do it on the command line:
 * 
 *   FACEBOOK_CLIENT_ID=abcd FACEBOOK_CLIENT_SECRET=1234 npm start
 * 
 * Or, better, you can create a ~/.$your_app_name.env.json file in
 * your home directory, and set them in there:
 * 
 * {
 *   FACEBOOK_CLIENT_ID: 'abcd',
 *   FACEBOOK_CLIENT_SECRET: '1234',
 * }
 * 
 * Concentrating your secrets this way will make it less likely that you
 * accidentally push them to Github, for example.
 * 
 * When you deploy to production, you'll need to set up these environment
 * variables with your hosting provider.
 **/

// Facebook needs the FACEBOOK_CLIENT_ID and FACEBOOK_CLIENT_SECRET
// environment variables.
OAuth.setupStrategy({
  provider: 'facebook',
  strategy: require('passport-facebook').Strategy,
  config: {
    clientID: env.FACEBOOK_CLIENT_ID,
    clientSecret: env.FACEBOOK_CLIENT_SECRET,
    callbackURL: 'http://10.0.2.2:1337/api/auth/facebook/callback'
  },
  passport
})

OAuth.setupStrategy({
  provider: 'google',
  strategy: require('passport-google-oauth').OAuth2Strategy,
  config: {
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://10.0.2.2.nip.io:1337/api/auth/google/callback'
  },
  passport
})

OAuth.setupStrategy({
  provider: 'twitter',
  strategy: require('passport-twitter').Strategy,
  config: {
    consumerKey: env.TWITTER_CONSUMER_KEY,
    consumerSecret: env.TWITTER_CONSUMER_SECRET,
    callbackURL: 'http://10.0.2.2:1337/api/auth/twitter/callback'
  },
  passport
})

// Other passport configuration:
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

const generateToken = (req, res, next) => {
  req.token = jwt.sign({id: req.user.id}, env.SERVER_SECRET, {expiresIn: 24*60*60});
  next();
}

const respond = (req, res) => {
  res.status(200).json({
    user: req.user,
    token: req.token
  });
}

const redirect = (req, res) => {
  const url = `biteswipe://callback?${req.token}`;
  res.redirect('biteswipe://callback');
}

auth.get('/whoami', (req, res) => res.send(req.user))

auth.post('/local/login', (req, res, next) => {
  passport.authenticate('local', {
    session: false
  })(req, res, next)
}, generateToken, respond)

auth.get('/:strategy/login', (req, res, next) => {
  passport.authenticate(req.params.strategy, {
    scope: ['profile']
  })(req, res, next)
})

auth.get('/:strategy/callback', (req, res, next) => {
  passport.authenticate(req.params.strategy)
  (req, res, next)
}, generateToken, redirect)

auth.post('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/api/auth/whoami')
})

module.exports = auth
