const express = require('express')
const requireAdmin = require('../middleware/requireAdmin')
const {
    getBooks,
  createBook, 
  deleteBook
} = require('../controllers/monthBookController')

const router = express.Router()

//GET ALL BOOKS
router.get('/', getBooks);

// POST a new book with requireAuth middleware
// router.post('/', requireAuth, createBook);
router.post('/', requireAdmin, createBook);

// DELETE a book with requireAuth middleware
router.delete('/:id', requireAdmin, deleteBook);

module.exports = router;