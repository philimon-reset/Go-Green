const express = require("express");
const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.route('/').get(userController.getall).post(userController.createUser)
userRouter.route('/:userId').get(userController.getbyid)


module.exports = userRouter;