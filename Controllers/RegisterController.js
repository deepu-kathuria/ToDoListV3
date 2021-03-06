require('../Models/User');
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const User = mongoose.model("User");

module.exports.PostRegister = (req, res) => { 
  User.register({username: req.body.username}, req.body.password, (err, user) => {
    if(err)
    {
      console.log(err);
      res.status(400).json({msg:"User already Registered!"});
    }else{
      passport.authenticate('local')(req, res, function(){
        res.send(200);
      });
    }
  });
};
