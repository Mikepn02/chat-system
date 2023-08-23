const express = require("express");
const controller = require("../controllers/namesController");
const namesroute = express.Router();

namesroute.post("/create", controller.create);
namesroute.delete("/delete/:id", controller.delete);
namesroute.delete("/deleteAll", controller.deleteAll);
namesroute.get("/getName", controller.getAll);
namesroute.get("/name/:id", controller.getById);
namesroute.get("ip/",controller.getByIp)
module.exports = namesroute;
