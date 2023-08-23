const express = require("express");
const controller = require("../controllers/intmessageController");
const router = express.Router();

router.post("/create", controller.create);
router.delete("/delete/:id", controller.delete);
router.get("/getUser", controller.getAll);
router.get("/user/:id", controller.getById);
router.get("/category/:id", controller.getByCategory);


module.exports = router;
