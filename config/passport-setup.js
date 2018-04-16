const passport = require('passport');
const TwitterStrategy = require('passport-twitter');
const keys = require('./keys');
const session = require('express-session');
const User = require('../models/user-model');

passport.serializeUser((user, done)=> {
    done(null, user.id);
});

passport.deserializeUser((id, done)=> {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new TwitterStrategy({
        //options for the strategy
        consumerKey: keys.twitter.consumerKey,
        consumerSecret: keys.twitter.consumerSecret,
        callbackURL: 'auth/twitter/redirect',       
    }, (accessToken, refreshToken, profile, done) => {
        //check if user already exists in our database
        User.findOne({twitterid: profile.id}).then((currentUser) => {
            if(currentUser){
                //already have the user
                console.log('user is:', currentUser);
                done(null, currentUser);
            } else {
                //if not, create user in our db
                new User({
                    username: profile.displayName,
                    twitterid: profile.id,
                    utoken: accessToken,
                    usec: refreshToken
                }).save().then((newUser) => {
                    console.log('new user created:' + newUser);
                    done(null, newUser);
                });
            }
        })
        
    })   
);
