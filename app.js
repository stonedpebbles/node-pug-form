// Pull in dependencies
const PORT = process.env.PORT || 3000;
const expressValidator = require("express-validator");
const app = require("express")();
const bodyParser = require("body-parser");
const routes = require("express").Router();
app.set("view engine", "pug");

// With body-parser and expressValidator configured, 
app.use(bodyParser());
app.use(expressValidator());

// we can now create our routes:
app.get("/", function(req, res) {
  res.render("index.pug");
});

app.get("/account", function(req, res) {
  res.render("account.pug", {
    name: "Jon Wick",
    charge: "$100",
    hasPaid: false
  });
});

// gets the success message with 
app.get("/payment", function(req, res) {
  res.render("payment.pug");
});
app.post("/account", function(req, res) {
  req.checkBody("email", "Enter a valid email").isEmail();
  req
    .checkBody("phone", "Enter a valid UK phone number.")
    .isMobilePhone("en-US");
  req.checkBody("name", "Please enter a name").notEmpty();
  res.render("payment", { data: req.body });
});

// Turn on server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
