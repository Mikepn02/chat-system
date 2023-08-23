const express = require("express");
const controller = require("../controllers/logController");
const router = express.Router();

router.post("/create", controller.create);
router.delete("/delete/:id", controller.delete);
router.delete("/deleteAll", controller.deleteAll);
router.get("/getUser", controller.getAll);
router.get("/user/:id", controller.getById);
router.get('/ip',controller.getByIp)


module.exports = router;
