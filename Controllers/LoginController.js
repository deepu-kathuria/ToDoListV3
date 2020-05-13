require('../Models/User');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('mongoose');

const User = mongoose.model("User");
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


module.exports.GetLogin = (req, res) => { 
	// console.log(req.session);
    if(req.isAuthenticated()){
	  res.redirect('/list');
	}
	else{
		console.log('unauthorized');
	  res.render('login',  {display_variable: false, title: "Login"});
	}
};

module.exports.PostLogin = (req, res, next) => {
	// const user = new User({
 //      username: req.body.username,
 //      password: req.body.password
 //    });

    passport.authenticate('local',
	  (err, user, info) => {
	    if (err) {
	      return next(err);
	    }

	    if (!user) {
	      return res.redirect('/login?info=' + "Incorrect Credential");
	    }

	    req.logIn(user, function(err) {
	      if (err) {
	        return next(err);
	      }

	      return res.redirect('/list');
	    });

	  })(req, res, next);
}