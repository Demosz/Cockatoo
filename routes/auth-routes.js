const router = require('express').Router();
const passport = require('passport');

//auth login
router.get('/login', (req, res) => {
    res.render('login', {user: req.user});
});

// auth logout
router.get('/logout', (req, res) => {
    //handle with passport
    req.logout();
    res.redirect('/');
});
//auth with Twitter
router.get('/twitter',
  passport.authenticate('twitter'));

router.get('/twitter/redirect', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    
    res.redirect('/profile/');
  });

module.exports = router;