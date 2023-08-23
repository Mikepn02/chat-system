const express = require("express");
const controller = require("../controllers/logController");
const logroute = express.Router();

logroute.post("/create", controller.create);
logroute.delete("/delete/:id", controller.delete);
logroute.delete("/deleteAll", controller.deleteAll);
logroute.get("/getUser", controller.getAll);
logroute.get("/user/:id", controller.getById);
logroute.get('/ip',controller.getByIp)


module.exports = logroute;
