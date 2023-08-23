const express = require("express");
const controller = require("../controllers/userController");
const router = express.Router();

router.post("/create", controller.create);
router.delete("/delete/:id", controller.delete);
router.delete("/deleteAll", controller.deleteAll);
router.get("/getState", controller.getAll);
router.get("/state/:id", controller.getById);


module.exports = router;
