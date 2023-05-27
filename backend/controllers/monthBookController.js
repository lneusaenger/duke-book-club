const BookMonth = require('../models/monthBookModel');
const mongoose = require('mongoose')

// get all
const getBooks = async (req, res) => {
    const books = await BookMonth.find({}).sort({createdAt: -1})
  
    res.status(200).json(books)
  }
  
  // create a new book
  const createBook = async (req, res) => {
    const {title, description, author, coverURL} = req.body
    try {
      const book = await BookMonth.create({title, description, author, coverURL});
      res.status(200).json(book)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
  
  // delete a book
  const deleteBook = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'Object Id is not valid for deleting'})
    }
  
    const book = await BookMonth.findOneAndDelete({_id: id})
  
    if(!book) {
      console.log(book)
      return res.status(400).json({error: 'No such book month for deleting'})
    }
  
    res.status(200).json(book)
  }

  module.exports = {
    getBooks,
    createBook,
    deleteBook
  }