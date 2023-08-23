const express = require("express");
const controller = require("../controllers/barController");
const baroute = express.Router();

baroute.post("/create", controller.create);
baroute.delete("/delete/:id", controller.deleteById);
baroute.delete("/deleteAll", controller.getById);
baroute.delete("/deleteBy", controller.deleteBy);
baroute.get("/getUser", controller.getAll);
baroute.get("/user/:id", controller.getById);
baroute.patch("/updateliked", controller.updateLiked);
baroute.patch("/updatecomment", controller.updateComment);

module.exports = baroute;
