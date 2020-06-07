require('../Models/Item');
const mongoose = require('mongoose');
const GetDate = require('../date');

const Item = mongoose.model("Item");

exports.GetList = (req, res) => {
  if(req.isAuthenticated()){
    Item.findOne({userId: req.user.username, date: GetDate.getDate()}, (err, result) => {
      if(err)
        console.log(err);
      if(!result){
        // console.log('result:',result);
        return res.status(200).json([]);
      }else{
        return res.status(200).json(result.result);
      }
      res.end();
    });
  }
  else{
    res.status(400).json({msg: 'not authoried'});
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
              res.send(200);
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
              res.send(200);
            }
          });
        }
      }
    });
  }
};

exports.PostCompleteItem = (req, res) => {
  if(req.isAuthenticated()){
    var toggle = req.body.itemStatus;
    Item.updateOne({userId: req.user.username, date: GetDate.getDate(), 'result._id': req.body.checkbox}, 
      {$set: {'result.$.isDone': toggle}}, (err) => {
        if(err)
          console.log(err);
      res.send(200);
    });
  }
  else
  {
    res.redirect('/login');
  }    
};

exports.DeleteItem = (req, res) => {
  if(req.isAuthenticated()){
    var id = req.body.item;
    Item.updateOne({userId: req.user.username, date: GetDate.getDate()}, 
      {"$pull": {"result" : {"_id" : id }}}, (err, obj) => {
        if(!err){
          res.sendStatus(200);
        }
        else
        {
          res.send(400).json({msg: 'Could not delete Item'});
        }
      });
  }
  else
  {
    res.redirect('/login');
  }
}