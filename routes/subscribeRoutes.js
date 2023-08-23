const express = require("express");
const controller = require("../controllers/subscribeController");
const router = express.Router();

router.post("/create", controller.createText);
router.delete("/delete/:id", controller.delete);
router.delete("/deleteAll", controller.deleteAll);
router.get("/getUser", controller.getAll);
router.get("/user/:id", controller.getById);
router.patch("/sub/iduser", controller.getByIdUser);


module.exports = router;
