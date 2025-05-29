# Book Review API

A RESTful API for a book review system built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- CRUD operations for books and reviews
- Search functionality for books
- Pagination for books and reviews

## Database Schema

### User
- id: ObjectId
- name: String
- email: String (unique)
- password: String (hashed)
- createdAt: Date

### Book
- id: ObjectId
- title: String
- author: String
- genre: String (enum)
- description: String
- publishedYear: Number
- isbn: String
- createdAt: Date
- user: ObjectId (reference to User)

### Review
- id: ObjectId
- rating: Number (1-5)
- title: String
- text: String
- createdAt: Date
- book: ObjectId (reference to Book)
- user: ObjectId (reference to User)

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/book_review_api
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   ```
4. Start the server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/signup` - Register a new user
  ```
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- `POST /api/login` - Login and get JWT token
  ```
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Books
- `GET /api/books` - Get all books (with pagination)
  - Query parameters:
    - `page`: Page number (default: 1)
    - `limit`: Number of results per page (default: 10)
    - `genre`: Filter by genre
    - `author`: Filter by author
    - `sort`: Sort field (e.g., sort=title or sort=-createdAt for descending)
- `GET /api/books/:id` - Get a single book with reviews
- `POST /api/books` - Add a new book (requires authentication)
  ```
  {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Fiction",
    "description": "A novel about the American Dream.",
    "publishedYear": 1925,
    "isbn": "9780743273565"
  }
  ```

### Reviews
- `POST /api/books/:id/reviews` - Add a review for a book (requires authentication)
  ```
  {
    "rating": 5,
    "title": "Amazing book!",
    "text": "One of the best books I've ever read."
  }
  ```
- `PUT /api/reviews/:id` - Update your review (requires authentication)
- `DELETE /api/reviews/:id` - Delete your review (requires authentication)

### Search
- `GET /api/search?query=gatsby` - Search books by title or author

## Example API Requests (Postman)

### Register a new user
- Method: POST
- URL: http://localhost:3000/api/signup
- Headers: Content-Type: application/json
- Body (raw JSON):
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Login
- Method: POST
- URL: http://localhost:3000/api/login
- Headers: Content-Type: application/json
- Body (raw JSON):
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Create a new book
- Method: POST
- URL: http://localhost:3000/api/books
- Headers: 
  - Content-Type: application/json
  - Authorization: Bearer YOUR_TOKEN
- Body (raw JSON):
  ```json
  {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Fiction",
    "description": "A novel about the American Dream.",
    "publishedYear": 1925,
    "isbn": "9780743273565"
  }
  ```

### Add a review
- Method: POST
- URL: http://localhost:3000/api/books/BOOK_ID/reviews
- Headers: 
  - Content-Type: application/json
  - Authorization: Bearer YOUR_TOKEN
- Body (raw JSON):
  ```json
  {
    "rating": 5,
    "title": "Amazing book!",
    "text": "One of the best books I have ever read."
  }
  ```

### Search for books
- Method: GET
- URL: http://localhost:3000/api/search?query=gatsby