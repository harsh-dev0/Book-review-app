const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//Importing Routes
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

//connecting to database
connectDB();

//routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Book Review API is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
}); 