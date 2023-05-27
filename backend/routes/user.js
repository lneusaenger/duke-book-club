const express = require('express')

// controller functions
const { loginUser, signupUser, getUserBookLoans, getUser } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

router.get('/loans/:id', getUserBookLoans)

router.get('/:id', getUser)

module.exports = router