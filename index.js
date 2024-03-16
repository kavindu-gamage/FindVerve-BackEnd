const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const multer = require("multer");

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

//Import route files
const authRoutes = require("./routes/authRoutes");

// Middleware setup
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
  origin: process.env.CLIENT_URL, // Replace with your front-end origin
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(helmet());

//Define routes
app.use("/api/auth", authRoutes);

// MongoDB connection setup
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Connected");
    // Initialize GridFS stream
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection("uploads");
  })
  .catch((err) => {
    console.log(err);
  });

//Setup GridFS storage engine  for Multer
const storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: "uploads",
    };
  },
});
const upload = multer({ storage });

//Routes with files
app.post("upload", upload.single("file"), (req, res) => {
  res.json({ file: req.file });
});

// Start the server
app.listen(process.env.PORT || 4000, () => {
  console.log("BackEnd Server is running");
});
