const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  name:{
    type: String
  },
  say:{
    type: String
  },
  date:{
    type: String
  }
});

module.exports = mongoose.model('message', chatSchema);
