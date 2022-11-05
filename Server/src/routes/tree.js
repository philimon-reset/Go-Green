const express = require("express");
const treeController  = require("../controllers/treeController");

const treeRouter = express.Router();

treeRouter.route('/').get(treeController.getall);
treeRouter.route('/:treeId').get(treeController.getbyid);

// app.post('/trees/', (req, res) => {
// 	res.send('posting tree data!')
// })

// app.get('/trees/:treeId', (req, res) => {
// res.send('getting tree data with id!')
// })

// app.get('/trees:', (req, res) => {
// res.send('getting all trees data!')
// })

// router.route("/").post(treeController);

module.exports = treeRouter;