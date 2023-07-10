// User.js
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    maxlength: 20,
    minlength: 3,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email'
    }
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 3,
    select:false
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 20,
    minlength: 3,
    default: 'lastName'
  },
  location: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
    default: 'my city'
  }
});
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


userSchema.methods.createJWT = function () {
  if (!this._id) {
    throw new Error('User ID is undefined');
  }
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
};

userSchema.methods.comparePassword = async function (candidatePassword){
  const isMatch = await bcrypt.compare(candidatePassword,this.password)
  return isMatch
}

const User = mongoose.model('User', userSchema);
module.exports = User;
