const router = require('express').Router();
const Twitter = require('twitter-node-client').Twitter;
const https = require("https");
const passport = require('passport');
const keys = require('../config/keys');

router.get('/', (req, res) => {
    res.render('profile', {user: req.user});
});

router.get('/tweets', (req, res) => {

    var error = function (err, response, body) {
        console.log('ERROR [%s]', err);
        res.render('home', {user: req.user});
    };

    var success = function (data) {
        //console.log('Data [%s]', data);
        console.log('test');
        data = JSON.parse(data);
        var display = '';
        for (var i in data) {
            display += ((String(parseInt(i) + 1)) + ": " + data[i].text + " ");
        }
        /*data = data[0];
        console.log(data.text);*/
        //res.send('hi');

        /*var display2 = {};

        for (var i in data) {
            display2[i+1] = (data[i].text + " ");
        }
        
        exports.filling = "";
        for (element in display2) {
            exports.filling += "<p>{0}: {1}.</p>"
                .replace("{0}", element)
                .replace("{1}", display2[element]);
        };
        display2 = toString(display2);*/

        res.render('tweets', {user: req.user, display});
    };

    let config = {
        "consumerKey": keys.twitter.consumerKey,
        "consumerSecret": keys.twitter.consumerSecret,
        "accessToken": req.user.utoken,
        "accessTokenSecret": req.user.usec,  
        "callBackUrl": "XXX"
        };

    var twitter = new Twitter(config);
    twitter.getHomeTimeline({ count: '10'}, error, success);
    
});


module.exports = router;