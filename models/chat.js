'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChatSchema = new Schema({
    nick: String,
    msg: String,
    recept: String,
    created: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Chat', ChatSchema);