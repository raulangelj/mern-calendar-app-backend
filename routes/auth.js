/*
  Routes for user authentication
  Ruta: /api/auth
  host + /api/auth
*/
const { Router } = require("express");
const { check } = require("express-validator");
const {
  createUser,
  loginUser,
  refresToken,
} = require("../controllers/authController");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

/**
 * Create a new user
 */
router.post(
  "/signin",
  [
    check("name", "User name is requiered").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check(
      "password",
      "Password is required to be at least 6 characters"
    ).isLength({ min: 6 }),
    validateFields,
  ],
  createUser
);

/**
 * Login
 */
router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check(
      "password",
      "Password is required to be at least 6 characters"
    ).isLength({ min: 6 }),
    validateFields,
  ],
  loginUser
);

/***
 * Renew user token (refresh token)
 */
router.get("/refresh", validateJWT, refresToken);

module.exports = router;
