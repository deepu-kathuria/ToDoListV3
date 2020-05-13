//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require('mongoose');
var session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');
const _ = require('lodash');
const LoginController = require('./Controllers/LoginController');
const RegisterController = require('./Controllers/RegisterController');
const ListController = require('./Controllers/ListController');
const SpecificListController = require('./Controllers/SpecificListController');
const SearchListController = require('./Controllers/SearchListController');
require('./Models/User');


const app = express();
const Schema = mongoose.Schema;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(session({
  secret: "This is my litle secret",
  resave: true,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/todolistDBV3", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);

const User = mongoose.model("User");

app.route('/login')
.get(LoginController.GetLogin)
.post(LoginController.PostLogin);

app.route('/register')
.get(RegisterController.GetRegister)
.post(RegisterController.PostRegister);

app.route('/')

.get((req, res) => {
  if(!req.isAuthenticated())
    res.render('home', {display_variable: false, title: "Home"});
  else
    res.redirect('/list');
});

app.route('/list')

.get(ListController.GetList)

.post(ListController.PostList);

app.route('/logout')

.get((req, res) => {
  req.session.destroy((err) => {
    if(!err)
      res.redirect('/login');
  });
});

app.route('/getSpecificList')

.get(SpecificListController.GetSpecificList)

.post(SpecificListController.PostSpecificList);

app.route('/CompleteItem')
.post(ListController.PostCompleteItem);

app.route('/list/deleteItem')
.post(ListController.DeleteItem);

app.route('/searchList')
.get(SearchListController.GetSearchList)
.post(SearchListController.PostSearchList);

let port = process.env.PORT;
if(port == null || port == "")
{
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started on port 3000");
});
