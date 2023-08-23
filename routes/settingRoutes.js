const express = require("express");
const controller = require("../controllers/userController");
const router = express.Router();

router.post("/create", controller.create);
router.get("/getUser", controller.getAll);
router.get("/setting/:id", controller.getById);
router.patch("/update", controller.update);

module.exports = router;
