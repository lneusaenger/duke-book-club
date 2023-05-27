const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({user,  token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password, name} = req.body
  

  try{
    const user = await User.signup(email, password, name)
    const token = createToken(user._id)
    res.status(200).json({user, token})
  } catch (error){
    res.status(400).json({error: error.message})
  }
}

const getUserBookLoans = async (req, res) => {
  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'User ID is not valid for getting loans'});
  }
  
  const user = await User.findById(id)

    if (!user) {
      return res.status(400).json({ error: 'Error getting loans' })
    }
    else{
      return res.status(200).json(user.loans)
    };
  }

const getUser = async (req, res) => {
  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'User ID is not valid for getting user'});
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(400).json({ error: 'Error getting user' });
  }
  else{
    return res.status(200).json(user);
  };
}

module.exports = { signupUser, loginUser, getUserBookLoans, getUser }