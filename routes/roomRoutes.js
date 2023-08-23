const express = require("express");
const controller = require("../controllers/roomController");
const roomroute = express.Router();

roomroute.post("/create", controller.create);
roomroute.delete("/deleteAll", controller.deleteAll);
roomroute.get("/getUser", controller.getAll);
roomroute.get("/room/:id", controller.getById);
roomroute.patch("room/ip", controller.getByIp);
roomroute.patch("/updatePass", controller.updatePass);
roomroute.patch("/updatePic", controller.updatePic);
roomroute.patch("/update", controller.update);

module.exports = roomroute;
