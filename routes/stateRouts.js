const express = require("express");
const controller = require("../controllers/userController");
const stateroute = express.Router();

stateroute.post("/create", controller.create);
stateroute.delete("/delete/:id", controller.delete);
stateroute.delete("/deleteAll", controller.deleteAll);
stateroute.get("/getState", controller.getAll);
stateroute.get("/state/:id", controller.getById);


module.exports = stateroute;
