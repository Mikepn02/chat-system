const express = require("express");
const controller = require("../controllers/intmessageController");
const msgroute = express.Router();

msgroute.post("/create", controller.create);
msgroute.delete("/delete/:id", controller.delete);
msgroute.get("/getUser", controller.getAll);
msgroute.get("/user/:id", controller.getById);
msgroute.get("/category/:id", controller.getByCategory);


module.exports = msgroute;
