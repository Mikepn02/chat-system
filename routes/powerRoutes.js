const express = require("express");
const controller = require("../controllers/powerController");
const poweroute = express.Router();

poweroute.post("/create", controller.create);
poweroute.delete("/delete/:id", controller.deleteText);
poweroute.delete("/deleteAll", controller.deleteAll);
poweroute.get("/getPower", controller.getAll);
poweroute.get("/power/:id", controller.getById);
poweroute.patch("/update", controller.update);


module.exports = poweroute;
