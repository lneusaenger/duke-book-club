const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const requireAdmin = require('../middleware/requireAdmin')
const {
  getBooks, 
  getBook, 
  createBook, 
  deleteBook, 
  updateBook,
  getReviews
} = require('../controllers/bookController')

const router = express.Router()

//GET ALL BOOKS
router.get('/', getBooks);

// GET a single book
router.get('/:id', getBook);

// POST a new book with requireAuth middleware
// router.post('/', requireAuth, createBook);
router.post('/', createBook);

// DELETE a book with requireAuth middleware
router.delete('/:id', requireAdmin, deleteBook);

// UPDATE a book with requireAuth middleware
router.patch('/:id', requireAuth, updateBook);

// GET book reviews
router.get('/reviews/:id', getReviews);

module.exports = router;

module.exports = router