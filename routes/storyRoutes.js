const express = require("express");
const controller = require("../controllers/storyController");
const storyroute = express.Router();

storyroute.post("/create", controller.create);
storyroute.delete("/delete/:id", controller.delete);
storyroute.delete("/deleteAll", controller.deleteAll);
storyroute.get("/getUser", controller.getAll);
storyroute.get("/user/:id", controller.getById);
storyroute.patch("/update/:id", controller.update);
storyroute.patch("/update", controller.update);


module.exports = storyroute;
