const express = require("express");
const bountyController= require("../controllers/bountyController");

const bountyRouter = express.Router();

bountyRouter.route('/').get(bountyController.getall);
bountyRouter.route('/:bountyId').get(bountyController.getbyid);
// bountyRouter.route('users/:userId')
// bountyRouter.route('users/:userId/claim_bountyId')
// bountyRouter.route('users/:userId/claim_bounty/:bountyId')
// bountyRouter.route('users/:userId/approve_bounty/:approvedUserId')




// app.post('users/:userId/bounties', (req, res) => {
// res.send('creating a bounty data!')
// })


// app.get('/bounties/', (req, res) => {
// res.send('getting bounties data!')
// })

// app.get('/bounties/', (req, res) => {
// res.send('getting bounties data!')
// })

// app.get('/bounties/:bountyId', (req, res) => {
// res.send('getting bounties data! by id')
// })

// app.post('users/:userId/claim_bountyId', (req, res) => {
// res.send('adding to claims')
// })


// // app.post('users/:userId/claim_bounty/:bountyId', (req, res) => {
// //     res.send('posting bounties data!')
// // })

// app.post('users/:userId/approve_bounty/:approvedUserId', (req, res) => {
// res.send('posting bounties data!')
// })

// router.route("/").post(bountyController);

module.exports = bountyRouter;