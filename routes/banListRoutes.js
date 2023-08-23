const express = require("express");
const controller = require('../controllers/banListController')
const router = express.Router();

router.post("/create", controller.createBand);
router.delete("/delete/:id", controller.deleteBand);
router.delete("/deleteAll", controller.deleteAll);
router.get("/getUser", controller.getAll);
router.get("/user/:id", controller.getById);
router.get("user/:ip",controller.getByIps)
router.patch("/update/:id", controller.update);

module.exports = router;
