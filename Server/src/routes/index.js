const express = require("express");
const userRouter = require("./users");
const treeRouter = require("./tree");
const bountyRouter = require("./bounty");
const cityRouter = require("./city");

const router = express.Router();
// router.get('/', (req, res) => {
// 	res.json({data: 'Hello World!'})
//       })

router.use('/users', userRouter);
router.use('/tree',treeRouter);
router.use('/bounty',bountyRouter);
router.use('/city',cityRouter);

module.exports = router;