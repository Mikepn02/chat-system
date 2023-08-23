const express = require("express");
const controller = require("../controllers/cutController");
const cutroute = express.Router();

cutroute.post("/create", controller.createCut);
cutroute.delete("/delete/:id", controller.deleteById);
cutroute.get("/getUser", controller.getAll);
cutroute.get("/user/:id", controller.getById);


module.exports = cutroute;
