require('../Models/Item');
const mongoose = require('mongoose');
const GetDate = require('../date');

const Item = mongoose.model("Item");

exports.GetList = (req, res) => {
  if(req.isAuthenticated()){
    // console.log(req.user.username + "   " + getDateF())
    Item.findOne({userId: req.user.username, date: GetDate.getDate()}, (err, result) => {
      if(err)
        console.log(err);
      if(!result){
        // console.log("1");
        // console.log("result is null");
        res.render('list', {listTitle: GetDate.getDate(), newListItems:[], display_variable:true, title: "Today's List"});
      }else{
        // console.log("2");
        // console.log(result.result);
        res.render('list', {listTitle: GetDate.getDate(), newListItems:result.result, display_variable:true, title: "Today's List"});
      }
      res.end();
    });
  }
  else{
    res.redirect('/login');
  }
};

exports.PostList = (req, res) => {
  if(req.isAuthenticated()){
    Item.findOne({userId: req.user.username, date: GetDate.getDate()}, (err, result) => {
      if(err){
        console.log(err);
      }else
      {
        if(result){
          Item.updateOne({userId: req.user.username, date: GetDate.getDate()}, {$push: {result: {itm: req.body.newItem, isDone: false}}}, (err) => {
            if(err)
              console.log(err);
            else
              res.redirect('/list');
          });
        }
        else
        {
          var list = new Item({
            date: GetDate.getDate(),
            result: [{itm: req.body.newItem, isDone: false}],
            userId: req.user.username
          });
          list.save((err) => {
            if(err){
              console.log(err);
            }
            else
            {
              res.redirect('/list');
            }
          });
        }
      }
    });
  }
};

exports.PostCompleteItem = (req, res) => {
  if(req.isAuthenticated()){
    var toggle = typeof req.body.checkbox == "string" ? false : true;
    Item.updateOne({userId: req.user.username, date: GetDate.getDate(), 'result._id': req.body.checkbox}, 
      {$set: {'result.$.isDone': toggle}}, (err) => {
        if(err)
          console.log(err);
      res.redirect('/list');
    });
  }
  else
  {
    res.redirect('/login');
  }    
};

exports.DeleteItem = (req, res) => {
  if(req.isAuthenticated()){
    var checkbox1 = typeof req.body.checkbox == "object" ? checkbox1 = req.body.checkbox["0"] : req.body.checkbox;
    // console.log(checkbox1);
    Item.updateOne({userId: req.user.username, date: GetDate.getDate()}, 
      {"$pull": {"result" : {"_id" : checkbox1 }}}, (err, obj) => {
        if(!err){
          res.redirect('/list');
        }
      });
  }
  else
  {
    res.redirect('/login');
  }
}