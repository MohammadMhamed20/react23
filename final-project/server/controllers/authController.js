const User = require("../models/User");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

// add new user controller
const addNewUserController = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body || {};

    // check user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        error: {
          email: "This email already exists",
        },
      });
    }

    // password hashed
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "server Error" });
        }

        if (hash) {
          // create new user
          const newUser = new User({
            firstName,
            lastName,
            email,
            password: hash,
            joinedDate: Date.now(),
          });

          // save user in db
          await newUser.save();

          // send response
          res.status(201).json({
            message: "User created successfully",
            user: newUser,
          });
        }
      });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Server error",
    });
  }
};

// login controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    // check user available
    const user = await User.findOne({ email });

    // check user exists
    if (!user) {
      return res.status(400).json({
        error: {
          email: "User not found! Please try again!!",
        },
      });
    }

    // check password correct or incorrect
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        return res.status(500).json({
          error: "Server Error Occurred!",
        });
      }

      if (!result) {
        return res.status(400).json({
          error: {
            password: "Email or Password Incorrect!",
          },
        });
      }

      // prepare the user object to generate token
      const userObject = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
        bio: user.bio,
        profilePic: user.profilePic,
        joinedDate: user.joinedDate,
      };

      // generate token
      const token = jwt.sign(userObject, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
      });

      res.status(200).json({
        user: userObject,
        token,
      });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Server error",
    });
  }
};

// update profile controller
const updateProfileController = async (req, res) => {
  try {
    const { _id } = req.user || {};
    const { firstName, lastName, gender, bio } = req.body || {};

    const user = await User.findById(_id);

    user.firstName = firstName;
    user.lastName = lastName;
    user.gender = gender;
    user.bio = bio;

    await user.save();

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred!!",
    });
  }
};

module.exports = {
  addNewUserController,
  loginController,
  updateProfileController,
};
