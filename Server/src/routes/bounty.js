const express = require("express");
const bountyController= require("../controllers/bountyController");

const bountyRouter = express.Router();

bountyRouter.route('/').get(bountyController.getall);


module.exports = bountyRouter;