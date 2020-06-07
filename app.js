//jshint esversion:6

const express = require("express");
const mongoose = require('mongoose');
var session = require('express-session');
const passport = require('passport');
const LoginController = require('./Controllers/LoginController');
const RegisterController = require('./Controllers/RegisterController');
const ListController = require('./Controllers/ListController');
const SpecificListController = require('./Controllers/SpecificListController');
const SearchListController = require('./Controllers/SearchListController');
// const cors = require('cors');
require('./Models/User');


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}));
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

// app.use(cors);

app.route('/api/login')
.post(LoginController.PostLogin);

app.route('/api/register')
.post(RegisterController.PostRegister);

app.route('/api/checkSession')
.get((req, res) => {
  if(req.isAuthenticated())
  {
    res.status(200).json({msg: 'authenticated'});
    res.end();
  }
  else{
    res.status(200).json({msg: 'not authenticated'});
    res.end()
  }
})

app.route('/')

.get((req, res) => {
  if(!req.isAuthenticated())
    res.render('home', {display_variable: false, title: "Home"});
  else
    res.redirect('/list');
});

app.route('/api/list')

.get(ListController.GetList)

.post(ListController.PostList);

app.route('/api/logout')
.post((req, res) => {
  // console.log('1');
  req.session.destroy((err) => {
    if(!err)
      res.send(200);
    // console.log(err);
  });
});

app.route('/api/getSpecificList')
.post(SpecificListController.PostSpecificList);

app.route('/api/CompleteItem')
.post(ListController.PostCompleteItem);

app.route('/api/list/deleteItem')
.post(ListController.DeleteItem);

app.route('/api/searchList')
.post(SearchListController.PostSearchList);

let port = process.env.PORT;
if(port == null || port == "")
{
  port = 3001;
}
app.listen(port, function() {
  console.log("Server started on port 3001");
});
