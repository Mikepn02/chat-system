const express = require("express");
const controller = require("../controllers/bscbController");
const router = express.Router();

router.post("/create", controller.create);
router.delete("/delete/:id", controller.deleteById);
router.delete("/deleteAll", controller.getById);
router.get("/getUser", controller.getAll);
router.get("/user/:id", controller.getById);
router.patch("/update/:id", controller.update);

module.exports = router;
