const mongoose = require('mongoose')

const Schema = mongoose.Schema

let Book;

const bookSchema = new Schema({
        title : {
            type: String,
            require: true,
            unique: true
        },
        uniqueBook: {
            type: String,
            require: true,
            unique: true
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
        reads : [{
            email: {
                type: String,
                require: true
            },
            name: {
                type: String,
                require: true,
            },
            review: {
                type: String,
                default: "This person did not leave a review.",
            },
            rating: {
                type: Number,
                require: true,
                min: 0,
                max: 5,
            },
            finished: {
                type: Date,
                default: Date.now,
            }
        }]
    });

module.exports = mongoose.model('Book', bookSchema)