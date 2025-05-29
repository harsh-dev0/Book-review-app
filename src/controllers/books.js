const Book = require('../models/Book');
const Review = require('../models/Review');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
exports.getBooks = async (req, res) => {
  try {
    const reqQuery = { ...req.query };
    const removeFields = ['select', 'sort', 'page', 'limit'];

    removeFields.forEach(param => delete reqQuery[param]);
    let queryStr = JSON.stringify(reqQuery);   
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    
    let query = Book.find(JSON.parse(queryStr));

    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Book.countDocuments();

    query = query.skip(startIndex).limit(limit);
    const books = await query;
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: books.length,
      pagination,
      data: books
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Get single book
// @route   GET /api/books/:id
// @access  Public
exports.getSingleBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }

    // Get reviews for the book with pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const reviews = await Review.find({ book: req.params.id })
      .skip(startIndex)
      .limit(limit)
      .populate({
        path: 'user',
        select: 'name'
      });
    
    const reviewCount = await Review.countDocuments({ book: req.params.id });
    
    const ratingResult = await Review.aggregate([
      { $match: { book: book._id } },
      { $group: { _id: null, averageRating: { $avg: '$rating' } } }
    ]);
    
    const averageRating = ratingResult.length > 0 ? ratingResult[0].averageRating : 0;

    const pagination = {};

    if (endIndex < reviewCount) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      data: {
        ...book._doc,
        averageRating,
        reviews,
        reviewCount,
        pagination
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Create new book
// @route   POST /api/books
// @access  Private
exports.createBook = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const book = await Book.create(req.body);

    res.status(201).json({
      success: true,
      data: book
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
}; 