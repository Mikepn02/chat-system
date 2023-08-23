const express = require("express");
const controller = require("../controllers/notextController");
const notextroute = express.Router();

notextroute.post("/create", controller.create);
notextroute.delete("/delete/:id", controller.deleteText);
notextroute.delete("/deleteAll", controller.deleteAll);
notextroute.get("/getText", controller.getAll);
notextroute.get("/text/:id", controller.getById);




module.exports = notextroute;
