const express = require("express");
const controller = require("../controllers/bscbController");
const bsbroute = express.Router();

bsbroute.post("/create", controller.create);
bsbroute.delete("/delete/:id", controller.deleteById);
bsbroute.delete("/deleteAll", controller.getById);
bsbroute.get("/getUser", controller.getAll);
bsbroute.get("/user/:id", controller.getById);
bsbroute.patch("/update/:id", controller.update);

module.exports = bsbroute;
