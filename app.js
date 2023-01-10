var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
const bodyParser = require("body-parser");

var app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var homeRouter = require("./routes/home");
var aboutRouter = require("./routes/about");
var portfolioRouter = require("./routes/portfolio");

app.use("/home", homeRouter);
app.use("/about", aboutRouter);
app.use("/portfolio", portfolioRouter);

app.set("view engine", "ejs");
app.get("/eazyPay", (req, res) => {
  res.render("eazyPay");
});
app.get("/shoppify", (req, res) => {
  res.render("shoppify");
});
app.get("/offside", (req, res) => {
  res.render("offside");
});
app.get("/form", (req, res) => {
  res.render("form");
});
app.get("/admin", (req, res) => {
  res.render("admin");
});

mongoose.connect("mongodb://localhost:27017/MyPortfolio");
var db = mongoose.connection;
db.on("error", () => console.log("Error in database connection"));
db.once("open", () => console.log("Connected to Database"));

app.post("/hireme", (req, res) => {
  console.log(req.body);
  var entry = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    personalMail: req.body.personalMail,
    companyName: req.body.companyName,
    companyMail: req.body.companyMail,
    designation: req.body.designation,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    zipCode: req.body.zip,
    message: req.body.message,
  };
  console.log(JSON.stringify(entry));
  db.collection("hiremes").insertOne(entry, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Inserted successfully");
  });
});

app.get("/fetchData", (req, res) => {
  // console.log("showing db");
  db.collection("hiremes")
    .find()
    .toArray(function (err, items) {
      if (err) throw err;
      res.render("database", { docsList: items });
    });
});

app.listen(1234, () => {
  console.log("Portfolio is being hosted on port 1234...");
});
