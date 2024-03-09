const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT || 4000, () => {
  console.log("BackEnd Server is running");
});
