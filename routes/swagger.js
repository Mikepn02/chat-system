/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       in: header
 *       name: Authorization
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
/**
 /**
 * @swagger
 * /users/sign:
 *   post:
 *     summary: Signup user
 *     tags: [Users]
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
 *               passwordConfirm:
 *                 type: string
 *               topic:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *               - passwordConfirm
 *               - topic
 *     responses:
 *       200:
 *         description: Successful signup
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: create user
 *     tags: [Users]
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
 *               passwordConfirm:
 *                 type: string
 *               topic:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *               - passwordConfirm
 *               - topic
 *     responses:
 *       200:
 *         description: Successful signup
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */



module.exports ={}