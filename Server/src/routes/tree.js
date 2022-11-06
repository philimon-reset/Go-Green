const express = require("express");
const treeController  = require("../controllers/treeController");

const treeRouter = express.Router();

treeRouter.route('/').get(treeController.getall).post(treeController.addTree);
treeRouter.route('/:treeId').get(treeController.getbyid);


module.exports = treeRouter;