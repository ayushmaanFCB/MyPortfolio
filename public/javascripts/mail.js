// var mongoose = require("mongoose");
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/MyPortfolio");

document.getElementById("HireMe").addEventListener("submit", submitForm);

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("connection successfull");
});

function submitForm(e) {
  e.preventDefault();

  var firstName = getElementVal("inputFirstName");
  var lastName = getElementVal("inputLastName");
  var companyName = getElementVal("inputCompanyName");
  var designation = getElementVal("inputDesignation");
  var address = getElementVal("inputAddress");
  var city = getElementVal("inputCity");
  var state = getElementVal("inputState");
  var country = getElementVal("inputCountry");
  var zipCode = getElementVal("inputZip");
  var message = getElementVal("message");
  var companyMail = getElementVal("inputCompanyMail");
  var personalMail = getElementVal("inputPersonalMail");

  console.log(
    firstName,
    lastName,
    personalMail,
    companyName,
    companyMail,
    designation,
    address,
    city,
    state,
    country,
    zipCode,
    message
  );

  saveMessages(
    firstName,
    lastName,
    personalMail,
    companyName,
    companyMail,
    designation,
    address,
    city,
    state,
    country,
    zipCode,
    message
  );

  // enable alert
  document.querySelector(".alert").style.display = "block";

  // remove alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  // reset form
  document.getElementById("HireMe").reset();
}

const saveMessages = (
  firstName,
  lastName,
  personalMail,
  companyName,
  companyMail,
  designation,
  address,
  city,
  state,
  country,
  zipCode,
  message
) => {
  const mySchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    personalMail: String,
    companyName: String,
    designation: String,
    address: String,
    city: String,
    state: String,
    country: String,
    zipCode: Number,
    message: String,
  });

  const myModel = mongoose.model("HireMe", mySchema);

  var data1 = new myModel({
    firstName: firstName,
    lastName: lastName,
    personalMail: personalMail,
    companyName: companyMail,
    designation: designation,
    address: address,
    city: city,
    state: state,
    country: country,
    zipCode: zipCode,
    message: message,
  });

  data1.save(function (err, product) {
    if (err) return console.error(err);
    console.log(product.name + " has been added to the desired collection");
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
