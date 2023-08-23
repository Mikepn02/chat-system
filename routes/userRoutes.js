const express = require("express");
const controller = require("../controllers/userController");
const authContoller = require("../controllers/authController");
const { protectUser } = require("../middlewares/authMiddleware");
const userouter = express.Router();

userouter.post("/users/login", authContoller.login);
userouter.post("/users/sign", authContoller.signup);
userouter.post("/users/create", protectUser,controller.create);
userouter.delete("/users/delete/:id", protectUser, controller.delete);
userouter.delete("/users/deleteAll", protectUser , controller.deleteAll);
userouter.get("/users/getUser", protectUser ,controller.getAll);
userouter.get("/users/user/:id", protectUser ,controller.getById);
userouter.patch("/users/update/:id",protectUser , controller.updateUser);

module.exports = userouter;
