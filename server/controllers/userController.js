const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    //   Get user input
    const { email, password } = req.body;

    //   Validate user input
    if (!(email && password)) {
      res.status(400).json({ success: false, message: "All input is required" });
    }

    //   Check if user already exist
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).json({ success: false, message: "User already exist" });
    }

    //   Hashing the password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      email: email,
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign({ email }, "secret", {
      expiresIn: "1h",
    });

    // save user token
    user.token = token;

    res.status(201).json({ success: true, token, email: user.email });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;
    // Validate user input
    if (!(email && password)) {
      return res.status(400).json({ success: false, message: "All input is required" }); // Return early
    }
    // Validate if user exists in our database
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ success: false, message: "Invalid Credentials" }); // Return early
    }
    // Create token
    const token = jwt.sign({ email }, process.env.TOKEN_KEY, {
      expiresIn: "1h",
    });
    // Save user token
    user.token = token;

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
