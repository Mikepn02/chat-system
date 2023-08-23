const express = require("express");
const controller = require("../controllers/userController");
const authContoller = require("../controllers/authController");
const router = express.Router();

router.post("/users/login", authContoller.login);
router.post("/users/sign", authContoller.signup);
router.post("/users/create", controller.create);
/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete("/users/delete/:id", controller.delete);
/**
 * @swagger
 * /users/deleteAll:
 *   delete:
 *     summary: Delete all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: All users deleted successfully
 *       500:
 *         description: Server error
 */
router.delete("/users/deleteAll", controller.deleteAll);
router.get("/users/getUser", controller.getAll);
/**
 * @swagger
 * /users/getUser:
 *   get:
 *     summary: These are all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: All users fetched successfully
 *       500:
 *         description: Server error
 */
router.get("/users/user/:id", controller.getById);
/**
 * @swagger
 * /users/user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to  fetcg
 *     responses:
 *       200:
 *         description: User fetched successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.patch("/users/update/:id", controller.updateUser);
/**
 * @swagger
 * /users/update/{id}:
 *   patch:
 *     summary: Update user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

module.exports = router;
