var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var path = require('path')
// on   ly do if not running on glitch
if (!process.env.PROJECT_DOMAIN) {
  // read environment variables (only necessary locally, not on Glitch)
  require('dotenv').config();
}
// the process.env values are set in .env

passport.use(new GoogleStrategy({
  clientID: '573576560384-elh951j93s8lq1bfoemn22nu4v6jklht.apps.googleusercontent.com',
  clientSecret: 'WBFI8BuQZrLd3Ws9fq-tQO1v',
  callbackURL: process.env.PROJECT ? `'https://'+process.env.PROJECT_DOMAIN+'.glitch.me/login/google/return'` : 'http://localhost:8000/login/google/return',
  scope: 'https://www.googleapis.com/auth/plus.login'
},
function(token, tokenSecret, profile, cb) {
  return cb(null, profile);
}));
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// init project
var express = require('express');
var app = express();
var expressSession = require('express-session');

// cookies are used to save authentication
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(expressSession({ secret:'watchingfairies', resave: true, saveUninitialized: true, maxAge: (90 * 24 * 3600000) }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));



// index route
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// on clicking "logoff" the cookie is cleared
app.get('/logoff',
  function(req, res) {
    res.clearCookie('google-passport-example');
    res.redirect('/');
  }
);

app.get('/auth/google', passport.authenticate('google'));

app.get('/login/google/return', 
  passport.authenticate('google', 
    { successRedirect: '/setcookie', failureRedirect: '/' }
  )
);

// on successful auth, a cookie is set before redirecting
// to the success view
app.get('/setcookie', requireUser,
  function(req, res) {
    if(req.get('Referrer') && req.get('Referrer').indexOf("google.com")!=1){
      res.cookie('google-passport-example', new Date());
      res.redirect('/success');
    } else {
        res.redirect('/success');
    }
  }
);

// if cookie exists, success. otherwise, user is redirected to index
app.get('/success', requireLogin,
  function(req, res) {
    console.log('success route!!')
    res.sendFile(__dirname + '/views/success.html');
  }
);

app.get('/charts',
    function(req, res) {
        res.sendFile(__dirname + '/views/success.html');
    }
);
const myPath = path.join(__dirname, '/public')

//app.use(express.static(myPath));
//app.use(express.static(path.join(__dirname, 'node_modules')));

console.log('path', myPath)

function requireLogin (req, res, next) {
  if (!req.cookies['google-passport-example']) {
    res.redirect('/');
  } else {
    next();
  }
};

function requireUser (req, res, next) {
  if (!req.user) {
    res.redirect('/');
  } else {
    next();
  }
};

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
