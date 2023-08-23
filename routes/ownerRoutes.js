const express = require("express");
const controller = require("../controllers/ownerController");
const { route } = require("./userRoutes");
const router = express.Router();

router.post("/create", controller.create);
router.delete("/delete/:id", controller.delete);
router.delete("/deleteAll", controller.deleteAll);
router.get("/getUser", controller.getAll);
router.get("/user/:id", controller.getById);
router.get("user/ip",controller.getByIp)
router.patch('update',controller.update)
module.exports = router;
