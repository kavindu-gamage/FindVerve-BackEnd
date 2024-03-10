const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const authDTO = require("../dto/authDTO");

const authController = {
  async register(req, res) {
    try {
      //Extract user input from the request body
      const { fullname, email, password } = req.body;

      // Check if the user with the provided email already exists
      const exisitngUser = await User.findOne({ email });

      if (exisitngUser) {
        return res
          .status(400)
          .json({ message: "User with this Email already exists" });
      }

      //Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      //create new User
      const newUser = new User({
        fullname,
        email,
        password: hashedPassword,
      });

      //save the user to the database
      await newUser.save();

      //Generate JWT Token
      const token = authDTO.generateToken({
        email: newUser.email,
        userId: newUser._id,
      });

      //Respond with success message and token
      res.status(201).json({ message: "User registered Successfully", token });
    } catch (error) {
      console.error("Error registering User:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async login(req, res) {
    try {
      //Extract user input from request body
      const { email, password } = req.body;

      //Find the user by email
      const user = await User.findOne({ email });

      // If user not found or password does not match, return error
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      //Generate JWT Token
      const token = authDTO.generateToken({
        email: user.email,
        userId: user._id,
      });

      //Respond success message with token
      res.status(200).json({ message: "Login Successful", token });
    } catch (error) {
      //Handle errors
      console.error("Error login in user", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = authController;
