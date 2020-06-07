require('../Models/Item');
const mongoose = require('mongoose');

const Item = mongoose.model("Item");

exports.PostSpecificList = (req, res) => {
  if(req.isAuthenticated()){
    // console.log(req.body);
    // console.log(typeof req.body.date);
    Item.findOne({userId: req.user.username , date: req.body.date}, (err, result) => {
      if(err)
        console.log(err);
      if(!result){
        res.status(200).json([]);
      }else{
        res.status(200).json({Content: result.result});
      }
    });
  }
  else{
    res.status(400).json({msg: 'not authoried'});
  }
};