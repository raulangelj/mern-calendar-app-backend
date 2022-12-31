const { response } = require("express");
const { generateJWT } = require("../helpers/jwt");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/UserModel");

/**
 * Create a new user
 */
const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        msg: "User already exists with that email",
      });
    }

    user = new UserModel(req.body);

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // Generate JWT (json web token)
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      success: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Please contact the administrator",
    });
  }
};

/**
 * Login
 */
const loginUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "Email does not exist",
      });
    }

    // Confirm passwords
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        success: false,
        msg: "Wrong password",
      });
    }

    // Generate JWT (json web token)
    const token = await generateJWT(user.id, user.name);

    res.json({
      success: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Please contact the administrator",
    });
  }
};

/***
 * Renew user token (refresh token)
 */
const refresToken = async (req, res = response) => {
  const { uid, name } = req;

  // Generate JWT (json web token)
  const token = await generateJWT(uid, name);

  res.json({
    success: true,
    token,
  });
};

module.exports = {
  createUser,
  loginUser,
  refresToken,
};
