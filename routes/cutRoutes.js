const express = require("express");
const controller = require("../controllers/cutController");
const router = express.Router();

router.post("/create", controller.createCut);
router.delete("/delete/:id", controller.deleteById);
router.get("/getUser", controller.getAll);
router.get("/user/:id", controller.getById);


module.exports = router;
