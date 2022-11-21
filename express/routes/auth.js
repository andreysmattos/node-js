const express = require("express");

const router = express.Router();

router.post("/login", (req, res) => {
  if (req.body.name !== "andreysmattos") {
    return res.status(401).json("error");
  }

  return res.status(200).json("success");
});

router.get("/logout", (req, res) => {
  return res.status(200).json("Logout with success");
});

module.exports = router;
