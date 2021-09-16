const express = require("express");
const controllers = require("../controllers/controllers");

const Route = express.Router();

Route.get("/", (req, res, next) => {
  res.json("Hi this is node js");
});

Route.get("/getpost", controllers.getdata);

Route.post("/sendpost", controllers.sendData);

module.exports = Route;
