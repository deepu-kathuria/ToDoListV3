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

module.exports.PostLogin = (req, res, next) => {
	// console.log(req);
	// if(req.isAuthenticated())
	// {
	// 	console.log('yes');
	// 	return res.send(500);
	// }
	// res.json({msg:'My Req has been sent'});
    passport.authenticate('local',
	  (err, user, info) => {
	    if (err) {
	      return next(err);
	    }

	    if (!user) {
	      return res.status(400).json({msg: 'no user found'});
	    }

	    req.logIn(user, function(err) {
	      if (err) {
	        return next(err);
	      }

	      return res.status(200).json({msg:'found'});
	    });

	  })(req, res, next);
}