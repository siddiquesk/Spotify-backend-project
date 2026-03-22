const User = require("../model/userModel");
const Jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/* =========================
   USER REGISTER CONTROLLER
   ========================= */
const userRegister = async (req, res) => {
  // Destructure data from request body
  const { username, email, password, role = "user" } = req.body;

  try {
    // Check if user already exists (by username or email)
    const isAlreadyUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (isAlreadyUser) {
      return res.status(409).json({
        message: "User Already Exists",
      });
    }

    // Hash password before saving to database
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      username,
      email,
      password: hashPassword,
      role,
    });

    // Generate JWT token
    const token = Jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET
    );

    // Store token in cookie
    res.cookie("token", token);

    // Send success response
    res.status(200).json({
      message: "User Created Successfully",
      user,
      token,
    });

  } catch (err) {
    console.log(err);

    // Error response
    res.status(400).json({
      success: false,
      msg: err.message,
    });
  }
};

/* ======================
   USER LOGIN CONTROLLER
   ====================== */
const loginUser = async (req, res) => {
  // Destructure login credentials
  const { username, email, password } = req.body;

  try {
    // Find user by username or email
    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    // If user not found
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credential",
      });
    }

    // Compare entered password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password does not match
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // Generate JWT token
    const token = Jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET
    );

    // Store token in cookie
    res.cookie("token", token);

    // Send success response
    res.status(200).json({
      message: "Login Successfully",
      token,
    });

  } catch (err) {
    console.log(err);

    // Error response
    res.status(400).json({
      success: false,
      msg: err.message,
    });
  }
};

module.exports = {
  userRegister,
  loginUser,
};