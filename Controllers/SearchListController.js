require('../Models/Item');
const mongoose = require('mongoose');

const Item = mongoose.model("Item");

exports.GetSearchList = (req, res) => {
  res.render('SearchList', {display_variable:true, title: "Search List"});
};

exports.PostSearchList = (req, res) => {
  if(req.isAuthenticated()){
    Item.findOne({userId: req.body.username , date: req.body.date}, (err, result) => {
      if(err)
        console.log(err);
      if(!result){
        res.render('SearchOneList', {listTitle: req.body.date, newListItems:[], display_variable:true, title: "Go To Date"});
      }else{
        res.render('SearchOneList', {listTitle: req.body.date, newListItems:result.result, display_variable:true, title: "Go To Date"});
      }
    });
  }
  else{
    res.redirect("/login");
  }
};