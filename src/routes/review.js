const express = require('express');
const { updateReview, deleteReview } = require('../controllers/reviews');
const { protect } = require('../middleware/auth');

const router = express.Router();

router
  .route('/:id')
  .put(protect, updateReview)
  .delete(protect, deleteReview);

module.exports = router;