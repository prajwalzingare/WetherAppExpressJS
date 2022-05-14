const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
//important notes-jevha views chya file render karachya rahte tevha public madhlya html file delete marachya ani ha css sathi aplyala static path madhi public path dayava lagel.
//static path
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

//set view engine
app.set("view engine", "hbs");
//jevha apan views le templates folder madhi takto tevha tycaha path dayava lagto
app.set("views", template_path);
hbs.registerPartials(partials_path);
//basically what it does that it transfer all public file to home route
//css and image transfer kar raha hai only.
app.use(express.static(static_path));

app.get("", (req, res) => {
  res.render("index.hbs");
});

app.get("/about", (req, res) => {
  res.render("about.hbs");
});

app.get("/weather", (req, res) => {
  res.render("weather");
});

app.get("*", (req, res) => {
  res.render("404error", {
    errorMsg: "oops! page not found",
  });
});

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("Sucess");
});
