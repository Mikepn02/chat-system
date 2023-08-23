const express = require("express");
const controller = require("../controllers/ownerController");
const { route } = require("./userRoutes");
const owneroute = express.Router();

owneroute.post("/create", controller.create);
owneroute.delete("/delete/:id", controller.delete);
owneroute.delete("/deleteAll", controller.deleteAll);
owneroute.get("/getUser", controller.getAll);
owneroute.get("/user/:id", controller.getById);
owneroute.get("user/ip",controller.getByIp)
owneroute.patch('update',controller.update)
module.exports = owneroute;
