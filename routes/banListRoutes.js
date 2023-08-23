const express = require("express");
const controller = require('../controllers/banListController')
const banroute = express.Router();

banroute.post("/create", controller.createBand);
banroute.delete("/delete/:id", controller.deleteBand);
banroute.delete("/deleteAll", controller.deleteAll);
banroute.get("/getUser", controller.getAll);
banroute.get("/user/:id", controller.getById);
banroute.get("user/:ip",controller.getByIps)
banroute.patch("/update/:id", controller.update);

module.exports = banroute;
