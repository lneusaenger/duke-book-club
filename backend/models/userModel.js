const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    require: true
  },
  loans: {
    type: [Schema.Types.ObjectId], // Array of ObjectIds
    ref: 'BookLoan', // Reference to the BookLoan model
    require: true
  }
})

const acceptedEmails = require('../data/acceptedEmails.json')

//static signup method
userSchema.statics.signup = async function(email, password, name) {
  if (!email || !password || !name) {
    throw new Error('Please fill out all fields');
  }

  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }

  if (!/\d/.test(password)) {
    throw new Error('Password must contain at least one number');
  }

  const exists = await this.findOne({ email });

  // const isDukeEmail = email.endsWith('@duke.edu');

  const isAcceptedEmail = acceptedEmails.includes(email);

  if (exists) {
    throw new Error('User already exists');
  }

  // if (!isDukeEmail) {
  //   throw new Error('Invalid email domain.');
  // }

  if (!isAcceptedEmail) {
    throw new Error('Email is not accepted. Please contact us if you are a member.');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt)
  const user = await this.create({email, password:hash, name, loans:[]})
  return user;
};

userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}


module.exports = mongoose.model('User', userSchema)