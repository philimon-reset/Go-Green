const express = require("express");
const userRouter = require("./users");
const treeRouter = require("./tree");
const bountyRouter = require("./bounty");
const cityRouter = require("./city");
const fileRouter = require("./files");
const AuthController = require("../controllers/AuthController");

const router = express.Router();

router.use('/me', AuthController.me);

router.use('/users', userRouter);
router.use('/tree',treeRouter);
router.use('/bounty',bountyRouter);
router.use('/city',cityRouter);
router.use('/file',fileRouter);

module.exports = router;