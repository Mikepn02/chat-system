const express = require("express");
const controller = require("../controllers/storyController");
const router = express.Router();

router.post("/create", controller.create);
router.delete("/delete/:id", controller.delete);
router.delete("/deleteAll", controller.deleteAll);
router.get("/getUser", controller.getAll);
router.get("/user/:id", controller.getById);
router.patch("/update/:id", controller.update);
router.patch("/update", controller.update);


module.exports = router;
