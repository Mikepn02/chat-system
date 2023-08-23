const express = require("express");
const controller = require('../controllers/botsController')
const router = express.Router();

router.post("/create", controller.create);
router.delete("/delete/:id", controller.deleteBots);
router.get("/getUser", controller.getAll);
router.get("/user/:id", controller.getById);

module.exports = router;
