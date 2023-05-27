const mongoose = require('mongoose')

const Schema = mongoose.Schema

let MonthBook;

const monthBookSchema = new Schema({
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
        }
    });

module.exports = mongoose.model('MonthBook', monthBookSchema)