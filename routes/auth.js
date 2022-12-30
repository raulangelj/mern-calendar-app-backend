/*
  Routes for user authentication
  Ruta: /api/auth
  host + /api/auth
*/
const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.json({
    ok: true,
    msg: "get",
  });
});

module.exports = router;
