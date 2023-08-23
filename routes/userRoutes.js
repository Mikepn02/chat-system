const express = require("express");
const controller = require("../controllers/userController");
const authContoller = require("../controllers/authController");
const router = express.Router();

router.post("/login", authContoller.login);
router.post("/sign", authContoller.signup);
router.post("/create", controller.create);
router.delete("/delete/:id", controller.delete);
router.delete("/deleteAll", controller.deleteAll);
router.get("/getUser", controller.getAll);
router.get("/user/:id", controller.getById);
router.patch("/update/:id", controller.updateUser);

module.exports = router;
