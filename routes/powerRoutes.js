const express = require("express");
const controller = require("../controllers/powerController");
const router = express.Router();

router.post("/create", controller.create);
router.delete("/delete/:id", controller.deleteText);
router.delete("/deleteAll", controller.deleteAll);
router.get("/getPower", controller.getAll);
router.get("/power/:id", controller.getById);
router.patch("/update", controller.update);


module.exports = router;
