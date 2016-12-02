var express = require("express");
var bodyParser = require("body-parser");

var users = require("./users.json");
var mainCtrl = require("./mainCtrl.js");
var app = module.exports = express();
app.use(bodyParser.json());



//#1- Get all users & #2 get all users by language &
app.get("/api/users", mainCtrl.getUsers);
app.get("/api/users/:id", mainCtrl.getUser);

app.post("/api/users", mainCtrl.createUser);
app.post("/api/users/:type", mainCtrl.createAdminUser);
app.post("/api/users/language/:id", mainCtrl.changeLanguage);
app.post("/api/users/forums/:id", mainCtrl.addFavorite);

app.delete("/api/users/forums/:id", mainCtrl.removeFavorite);
app.delete("/api/users/:id", mainCtrl.banHammer);

app.put("/api/users/:id", mainCtrl.updateUser);




app.listen(3000, function(){
  console.log("listening to port 3000");
});
