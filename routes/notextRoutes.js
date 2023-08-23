const express = require("express");
const controller = require("../controllers/notextController");
const router = express.Router();

router.post("/create", controller.create);
router.delete("/delete/:id", controller.deleteText);
router.delete("/deleteAll", controller.deleteAll);
router.get("/getText", controller.getAll);
router.get("/text/:id", controller.getById);




module.exports = router;
