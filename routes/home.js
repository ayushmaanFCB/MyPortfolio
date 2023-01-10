var express = require("express");
var router = express.Router();
var path = require("path");

router.get("/", function (req, res) {
  res.sendFile(
    "C:\\Users\\dasay\\Documents\\CSE 220 - Web Programming and Scripting\\MyPortfolio\\public\\html\\index.html"
  );
});

module.exports = router;
