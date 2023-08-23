const express = require("express");
const controller = require("../controllers/roomController");
const router = express.Router();

router.post("/create", controller.create);
router.delete("/deleteAll", controller.deleteAll);
router.get("/getUser", controller.getAll);
router.get("/room/:id", controller.getById);
router.patch("room/ip", controller.getByIp);
router.patch("/updatePass", controller.updatePass);
router.patch("/updatePic", controller.updatePic);
router.patch("/update", controller.update);

module.exports = router;
