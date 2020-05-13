require('../Models/Item');
const mongoose = require('mongoose');

const Item = mongoose.model("Item");

exports.GetSpecificList = (req, res) => {
  res.render('getSpecificList', {display_variable:true, title: "Go To Date"});
};

exports.PostSpecificList = (req, res) => {
  if(req.isAuthenticated()){
    // console.log(req.body.date);
    Item.findOne({userId: req.user.username , date: req.body.date}, (err, result) => {
      if(err)
        console.log(err);
      if(!result){
        res.render('SpecificDateList', {listTitle: req.body.date, newListItems:[], display_variable:true, title: "Go To Date"});
      }else{
        res.render('SpecificDateList', {listTitle: req.body.date, newListItems:result.result, display_variable:true, title: "Go To Date"});
      }
    });
  }
  else{
    res.redirect("/login");
  }
};