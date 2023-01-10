var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  res.sendFile(
    "C:\\Users\\dasay\\Documents\\CSE 220 - Web Programming and Scripting\\MyPortfolio\\public\\html\\about.html"
  );
});

module.exports = router;
