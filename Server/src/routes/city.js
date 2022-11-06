const express = require("express");
const cityController= require("../controllers/cityController");

const bountyRouter = express.Router();

bountyRouter.route('/').get(cityController.getall);


module.exports = bountyRouter;