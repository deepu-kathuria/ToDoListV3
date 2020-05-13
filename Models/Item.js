const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  date: String,
  result: [{itm: String, isDone: Boolean}],
  userId: String
});

const Item = new mongoose.model("Item", itemSchema);