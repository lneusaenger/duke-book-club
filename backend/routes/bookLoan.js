const express = require('express')
const requireAdmin = require('../middleware/requireAdmin')
const requireAuth = require('../middleware/requireAuth')
const {
    getBookLoans,
    getBookLoan,
    createBookLoan,
    deleteBookLoan,
    changeAvailability
} = require('../controllers/bookLoanController')

const router = express.Router()

router.get('/', getBookLoans); //get all book loans

router.get('/:id', getBookLoan); //get a single book loan

// router.post('/', requireAuth, createBookLoan);
router.post('/', requireAuth, createBookLoan);

// router.delete('/:id', requireAdmin, deleteBookLoan);
router.delete('/:loanID', requireAuth, deleteBookLoan);

// router.patch('/:id', requireAuth, changeAvailability);
router.patch('/', requireAuth, changeAvailability);

module.exports = router;