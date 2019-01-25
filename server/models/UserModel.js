/**
 * This schema will have login data
 ***
 * The document will contain the following information
 * 1. Username
 * 2. Password
 * 3. Created_at
 */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {type: String,
  required: true},
  password: {type: String, required: true},
  created_at: {type: Date, default: Date.now}
});

module.exports=mongoose.model('User', userSchema);