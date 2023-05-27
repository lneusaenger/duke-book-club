const Book = require('../models/bookModel')
const mongoose = require('mongoose')

// get all workouts
const getBooks = async (req, res) => {
  const books = await Book.find({}).sort({createdAt: -1})

  res.status(200).json(books)
}

// get a single book
const getBook = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Object ID for getBook is invalid'})
  }

  const book = await Book.findById(id)

  if (!book) {
    return res.status(404).json({error: 'No such book to get'})
  }

  res.status(200).json(book)
}

// create a new book
const createBook = async (req, res) => {
  const {uniqueBook, title, description, author, coverURL} = req.body
  try {
    const existingBook = await Book.findOne({ uniqueBook });
      if (existingBook)
        return res.status(400).json({ error: "Book is already on shelf" });
    const book = await Book.create({uniqueBook, title, description, author, coverURL});
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

  const book = await Book.findOneAndDelete({_id: id})

  if(!book) {
    console.log(book)
    return res.status(400).json({error: 'No such book for deleting'})
  }

  res.status(200).json(book)
}

// update a book
const updateBook = async (req, res) => {
  const { id, email, finished, name, review, rating } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Object ID is not valid for updating' });
  }

  if (typeof rating !== 'number' || rating < 0 || rating > 5) {
    return res.status(400).json({ error: 'Rating should be a number between 0 and 5 (inclusive)'});
  }

  const book = await Book.findByIdAndUpdate(
    id,
    { $push: { reads: {email, finished, name, review, rating } } },
    { new: true }
  );

  if (!book) {
    return res.status(400).json({ error: 'No such book to update' });
  }

  const lastRead = book.reads[book.reads.length - 1];

  res.status(200).json(lastRead);
};


//get reads of a book
const getReviews = async (req,res) => {
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({error: 'Object ID is not valid for getting reviews ' + id})
  }
  
  const book = await Book.findById(id);
  const reviews = book.reads;

  if (!reviews) {
    return res.status(400).json({error: 'Reviews are null'})
  }

  res.status(200).json(reviews)
}

module.exports = {
  getBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook,
  getReviews
}