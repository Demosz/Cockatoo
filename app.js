//const session = require('express-session');
const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const Twitter = require('twitter-node-client').Twitter;
const cookieSession = require('cookie-session');
const passport = require('passport');
const path = require('path');

const app = express();
/*app.use(session(
    { secret: 'melody hensley is my spirit animal',
      resave: true,
      saveUninitialized: true }
));
*/

//set up view engine
app.set('view engine', 'ejs');

//set up Cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys:[keys.session.cookieKey]
}));

app.use(express.static(path.join(__dirname, '/public')));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb');
});


//set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

//create home route
app.get('/', (req, res) => {
    res.render('home', {user: req.user});
});


app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});
