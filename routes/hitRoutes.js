const express = require("express");
const controller = require("../controllers/hitContoller");
const hitroute = express.Router()

hitroute.post("/create", controller.create);
hitroute.delete("/delete/:id", controller.deleteById);
hitroute.delete("/deleteAll", controller.deleteAll);
hitroute.get("/getUser", controller.getAll);
hitroute.get("/user/:id", controller.getById);


module.exports = hitroute;
