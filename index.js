const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const multer = require("multer");

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

// MongoDB connection setup
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => {
    console.log(err);
  });

//Initialize GridFS stream
let gfs;
connection.once("open", () => {
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection("uploads");
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
