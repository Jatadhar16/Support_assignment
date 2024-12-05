const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  type: String,
  text: String,
  image: String,
});

const formSchema = new mongoose.Schema({
  title: String,
  headerImage: String,
  questions: [questionSchema],
  responses: [{ type: Map, of: String }],
});

module.exports = mongoose.model('Form', formSchema);
