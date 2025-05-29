# Book Review API

A RESTful API for a book review system built with Node.js, Express, and MongoDB.

## 🔗 Deployed API

Base URL: [https://book-review-app-92fq.onrender.com/](https://book-review-app-92fq.onrender.com/)

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
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

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

### Reviews
- `POST /api/books/:id/reviews` - Add a review for a book (requires authentication)
- `PUT /api/reviews/:id` - Update your review (requires authentication)
- `DELETE /api/reviews/:id` - Delete your review (requires authentication)

### Search
- `GET /api/search?query=search_term` - Search books by title or author

## Example API Requests (Postman)

### Register a new user
- Method: POST
- URL: http://localhost:3000/api/auth/signup
- Headers: Content-Type: application/json
- Body (raw JSON):
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

### Login
- Method: POST
- URL: http://localhost:3000/api/auth/login
- Headers: Content-Type: application/json
- Body (raw JSON):
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

### Get all books
- Method: GET
- URL: http://localhost:3000/api/books
- Response:
  ```json
  {
    "success": true,
    "count": 2,
    "pagination": {
      "next": {
        "page": 2,
        "limit": 10
      }
    },
    "data": [
      {
        "_id": "60c72b2f9f1b2c001553c234",
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "genre": "Fiction",
        "description": "A novel about the American Dream.",
        "publishedYear": 1925,
        "isbn": "9780743273565",
        "createdAt": "2023-06-14T15:23:11.234Z",
        "user": "60c72a9f9f1b2c001553c233"
      },
      {
        "_id": "60c72b4f9f1b2c001553c235",
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "genre": "Fiction",
        "description": "A novel about racial injustice.",
        "publishedYear": 1960,
        "isbn": "9780061120084",
        "createdAt": "2023-06-14T15:23:43.123Z",
        "user": "60c72a9f9f1b2c001553c233"
      }
    ]
  }
  ```

### Get a single book with reviews
- Method: GET
- URL: http://localhost:3000/api/books/60c72b2f9f1b2c001553c234
- Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "60c72b2f9f1b2c001553c234",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "genre": "Fiction",
      "description": "A novel about the American Dream.",
      "publishedYear": 1925,
      "isbn": "9780743273565",
      "createdAt": "2023-06-14T15:23:11.234Z",
      "user": "60c72a9f9f1b2c001553c233",
      "averageRating": 4.5,
      "reviews": [
        {
          "_id": "60c72c1f9f1b2c001553c236",
          "rating": 5,
          "title": "Amazing book!",
          "text": "One of the best books I've ever read.",
          "createdAt": "2023-06-14T15:26:23.567Z",
          "book": "60c72b2f9f1b2c001553c234",
          "user": {
            "_id": "60c72a9f9f1b2c001553c233",
            "name": "John Doe"
          }
        }
      ],
      "reviewCount": 1,
      "pagination": {}
    }
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
- Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "60c72b2f9f1b2c001553c234",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "genre": "Fiction",
      "description": "A novel about the American Dream.",
      "publishedYear": 1925,
      "isbn": "9780743273565",
      "createdAt": "2023-06-14T15:23:11.234Z",
      "user": "60c72a9f9f1b2c001553c233"
    }
  }
  ```

### Add a review for a book
- Method: POST
- URL: http://localhost:3000/api/books/60c72b2f9f1b2c001553c234/reviews
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
- Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "60c72c1f9f1b2c001553c236",
      "rating": 5,
      "title": "Amazing book!",
      "text": "One of the best books I have ever read.",
      "createdAt": "2023-06-14T15:26:23.567Z",
      "book": "60c72b2f9f1b2c001553c234",
      "user": "60c72a9f9f1b2c001553c233"
    }
  }
  ```

### Update a review
- Method: PUT
- URL: http://localhost:3000/api/reviews/60c72c1f9f1b2c001553c236
- Headers: 
  - Content-Type: application/json
  - Authorization: Bearer YOUR_TOKEN
- Body (raw JSON):
  ```json
  {
    "rating": 4,
    "title": "Great classic!",
    "text": "A timeless novel that captures the essence of the 1920s."
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "data": {
      "_id": "60c72c1f9f1b2c001553c236",
      "rating": 4,
      "title": "Great classic!",
      "text": "A timeless novel that captures the essence of the 1920s.",
      "createdAt": "2023-06-14T15:26:23.567Z",
      "book": "60c72b2f9f1b2c001553c234",
      "user": "60c72a9f9f1b2c001553c233"
    }
  }
  ```

### Delete a review
- Method: DELETE
- URL: http://localhost:3000/api/reviews/60c72c1f9f1b2c001553c236
- Headers: 
  - Authorization: Bearer YOUR_TOKEN
- Response:
  ```json
  {
    "success": true,
    "data": {}
  }
  ```

### Search for books
- Method: GET
- URL: http://localhost:3000/api/search?query=gatsby
- Response:
  ```json
  {
    "success": true,
    "count": 1,
    "data": [
      {
        "_id": "60c72b2f9f1b2c001553c234",
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "genre": "Fiction",
        "description": "A novel about the American Dream.",
        "publishedYear": 1925,
        "isbn": "9780743273565",
        "createdAt": "2023-06-14T15:23:11.234Z",
        "user": "60c72a9f9f1b2c001553c233"
      }
    ]
  }
  ```
