const express = require('express');
const { getBooks, getSingleBook, createBook } = require('../controllers/books');
const { addReview } = require('../controllers/reviews');
const { protect } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(getBooks)
  .post(protect, createBook);

router
  .route('/:id')
  .get(getSingleBook);

router
  .route('/:id/reviews')
  .post(protect, addReview);

module.exports = router; 