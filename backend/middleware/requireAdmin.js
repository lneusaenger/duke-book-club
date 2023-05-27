const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAdmin = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.SECRET)

    req.user = await User.findOne({ _id })
    const adminEmails = require('../data/admins.json')

    // Check if req.user's email is in the admin.json file
    if (req.user && adminEmails.includes(req.user.email)) {
        console.log("admin request granted")
        next();
    } else {
        res.status(401).json({ error: 'Admin request is not authorized' });
  }

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Admin request is not authorized'})
  }
}

module.exports = requireAdmin