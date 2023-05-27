const BookLoan = require('../models/bookLoanModel');
const mongoose = require('mongoose')
const User = require('../models/userModel')

// get all workouts
const getBookLoans = async (req, res) => {
  const books = await BookLoan.find({}).sort({createdAt: -1})

  res.status(200).json(books)
}

// get a single book
const getBookLoan = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Object ID for getBookLoan is invalid'})
  }

  const bookLoan = await BookLoan.findById(id)

  if (!bookLoan) {
    return res.status(404).json({error: 'No such book loan to get'})
  }

  res.status(200).json(bookLoan)
}

// create a new book
const createBookLoan = async (req, res) => {
  const {title, description, author, coverURL, userID, available} = req.body
  
  const bookLoan = await BookLoan.create({title, description, author, coverURL, userID, available});

  if(bookLoan){
    if (!mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ error: 'User ID is not valid for adding loan' });
    }
    if (!mongoose.Types.ObjectId.isValid(bookLoan._id)) {
      return res.status(400).json({ error: 'Loan ID is not valid for adding loan' });
    }
    
    const user = await User.findByIdAndUpdate(
      userID,
      { $push: { loans: bookLoan._id } },
      { new: true }
    );
    
    if (!user) {
      return res.status(400).json({error: 'Error adding loan to user profile'});
    }
    else {
      return res.status(200).json({bookLoan, user});
    }
  } else {
    res.status(400).json({ error: "Error adding loan" })
  }
}

// delete a book
const deleteBookLoan = async (req, res) => {
  const {loanID} = req.params

  if (!mongoose.Types.ObjectId.isValid(loanID)) {
    return res.status(400).json({error: 'Loan Id is not valid for deleting loan'})
  }

  const bookLoan = await BookLoan.findOneAndDelete({_id: loanID})

  if(!bookLoan) {
    console.log(bookLoan)
    return res.status(400).json({error: 'No such book loan for deleting'})
  }
  else {
    const userID = bookLoan.userID;
    if (!mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ error: 'User ID is not valid for deleting loan' });
    }
    
    const user = await User.findByIdAndUpdate(
        userID,
        { $pull: { loans: loanID } },
        { new: true }
      );
    
    if (!user) {
        return res.status(400).json({ error: 'Error deleting loan from user' });
    } else {
      res.status(200).json({user, bookLoan})
    }
  }
}

// update a book
const changeAvailability = async (req, res) => {
    const { id } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Object ID is not valid for updating' });
    }
  
    try {
      const bookLoan = await BookLoan.findById(id);
  
      if (!bookLoan) {
        return res.status(400).json({ error: 'No such book to update' });
      }
  
      const updatedBookLoan = await BookLoan.findByIdAndUpdate(
        id,
        { available: !bookLoan.available },
        { new: true }
      );
  
      const availability = updatedBookLoan.available;
  
      res.status(200).json(availability);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating the book availability' });
    }
  };

module.exports = {
  getBookLoans,
  getBookLoan,
  createBookLoan,
  deleteBookLoan,
  changeAvailability
}