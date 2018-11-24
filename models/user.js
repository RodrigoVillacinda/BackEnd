'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: { type: String, unique: true, lowercase: true},
    name : { type: String },
    username : { type: String },
    password : {type: String, select: false}
})

module.exports = mongoose.model('User', UserSchema)