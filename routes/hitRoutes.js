const express = require("express");
const controller = require("../controllers/hitContoller");
const router = express.Router()

router.post("/create", controller.create);
router.delete("/delete/:id", controller.deleteById);
router.delete("/deleteAll", controller.deleteAll);
router.get("/getUser", controller.getAll);
router.get("/user/:id", controller.getById);


module.exports = router;
