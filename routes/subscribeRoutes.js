const express = require("express");
const controller = require("../controllers/subscribeController");
const subroute = express.Router();

subroute.post("/create", controller.createText);
subroute.delete("/delete/:id", controller.delete);
subroute.delete("/deleteAll", controller.deleteAll);
subroute.get("/getUser", controller.getAll);
subroute.get("/user/:id", controller.getById);
subroute.patch("/sub/iduser", controller.getByIdUser);


module.exports = subroute;
