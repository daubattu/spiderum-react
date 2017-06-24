var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostModel = new Schema({
  title:  String,
  category: String,
  author: String,
});

module.exports = mongoose.model('Post', PostModel)
