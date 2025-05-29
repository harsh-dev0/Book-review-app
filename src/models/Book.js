const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  author: {
    type: String,
    required: [true, 'Please add an author'],
    trim: true
  },
  genre: {
    type: String,
    required: [true, 'Please add a genre'],
    enum: ['Fiction', 'Non-fiction', 'Science Fiction', 'Fantasy', 'Mystery', 'Thriller', 
           'Romance', 'Biography', 'History', 'Self-help', 'Business', 'Other']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  publishedYear: {
    type: Number,
    required: false
  },
  isbn: {
    type: String,
    required: false,
    unique: true,
    sparse: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// deleting the reviews when a book is deleted
BookSchema.pre('remove', async function(next) {
  await this.model('Review').deleteMany({ book: this._id });
  next();
});

// creating a virtual field for the reviews
BookSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'book',
  justOne: false
});

module.exports = mongoose.model('Book', BookSchema); 