const express = require("express");
const controller = require('../controllers/botsController')
const botsroute = express.Router();

botsroute.post("/create", controller.create);
botsroute.delete("/delete/:id", controller.deleteBots);
botsroute.get("/getUser", controller.getAll);
botsroute.get("/user/:id", controller.getById);

module.exports = botsroute;
