const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookLoanSchema = new Schema({
        title : {
            type: String,
            require: true
        },
        description : {
            type: String,
            default: "This book does not have a description.",
        },
        author: {
            type: String,
            require: true,
        },
        coverURL: {
            type: String,
            require: true,
        },
        userID: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        available: {
            type: Boolean,
            require: true,
        }
    });

module.exports = mongoose.model('BookLoan', bookLoanSchema)