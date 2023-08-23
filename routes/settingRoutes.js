const express = require("express");
const controller = require("../controllers/settingController");
const settingroute = express.Router();

settingroute.post("/create", controller.create);
settingroute.get("/getUser", controller.getAll);
settingroute.get("/setting/:id", controller.getById);
settingroute.patch("/update", controller.update);

module.exports = settingroute;
