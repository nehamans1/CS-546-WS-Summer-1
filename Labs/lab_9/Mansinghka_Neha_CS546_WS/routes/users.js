const express = require('express');
const router = express.Router();
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
//const userData = require("../data");
const userData = require("../data/index");
const users = userData.users;

passport.use(new Strategy(
    async function(username, password, cb) {
        console.log("user: "+username+" "+"password: "+password);
        var user = {};
        //userData.users.findByUsername(username, function(err, user) {
        try{
          user = await users.findByUsername(username);
        }catch(e){
          console.log("Coming in catch "+e);
          return cb(null, false, { message: e});
        }
          //if (err) { return cb(err); }
        if(!user){
          return cb(null, false, { message: 'Unknown User'});
        }
          //userData.users.comparePassword(password, user.hashedPassword, function(err, isMatch){
        try{
          var pwdmatch = await users.comparePassword(password, user.hashedPassword);
          console.log("pwdMatch "+pwdmatch);
            //if(err) throw err;
            if(pwdmatch){
              return cb(null, user);
            } else {
              return cb(null, false, { message: 'Invalid password'});
            }
          }catch(e){
            return cb(null, false, { message: e});
          }
    }
));


passport.serializeUser(function(user, cb) {
    cb(null, user._id);
  });
  
passport.deserializeUser(async function(id, cb) {
//userData.users.findById(id, function (err, user) {
  try{
    const user = await users.findById(id);
      //if (err) { return cb(err); }
    cb(null, user);
  }
  catch(e){
    return cb(e);
  }
});


router.get('/login',
function(req, res) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {      
    res.render('users/login', { message: req.flash('error') });
    //res.render('users/login');    
  }else{
    res.redirect('/private');  
  }
});
/* router.get("/profile",(req, res) => {
  console.log("user"+req.user);
    res.render("users/profile", {});
}); */
router.get('/private',
require('connect-ensure-login').ensureLoggedIn("/"),
function(req, res){
  res.render('users/private', { user: req.user});
});
/*router.get('/dashboard',
require('connect-ensure-login').ensureLoggedIn("/"),
function(req, res){
  res.render('users/dashboard', { user: req.user});
});*/
router.post('/login',
passport.authenticate('local', {successRedirect:'/private', failureRedirect:'/login', failureFlash: true}),
function(req, res) {
   // console.log('You are authenticated');    
    res.redirect('/private');
});

router.get('/logout',function(req, res){
  req.logout();
  //req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
});

module.exports = router;