const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/user');
const bookLoanRoutes = require('./routes/bookLoan');
const monthBookRoutes = require('./routes/monthBook')

require('dotenv').config();

const app = express();

  // Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next()
});

  // API routes
  app.use('/api/user', userRoutes);
  app.use('/api/books', bookRoutes);
  app.use('/api/bookLoans', bookLoanRoutes)
  app.use('/api/month', monthBookRoutes)

  // Start the server
  mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
