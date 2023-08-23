const express = require("express");
const controller = require("../controllers/namesController");
const router = express.Router();

router.post("/create", controller.create);
router.delete("/delete/:id", controller.delete);
router.delete("/deleteAll", controller.deleteAll);
router.get("/getName", controller.getAll);
router.get("/name/:id", controller.getById);
route.get("ip/",controller.getByIp)
module.exports = router;
