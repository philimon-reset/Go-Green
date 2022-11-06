const express = require("express");
const userController = require("../controllers/userController");
const AuthController = require("../controllers/AuthController");
const {checknotauthenticated} = require("../controllers/middleware/checkauth");

const userRouter = express.Router();

userRouter.route('/').get(userController.getall);
userRouter.route('/register').post(checknotauthenticated, AuthController.signup);
userRouter.route('/login').post(checknotauthenticated, AuthController.login);
userRouter.route('/logout').post(AuthController.logout);
userRouter.route('/:userId').get(userController.getbyid);


module.exports = userRouter;