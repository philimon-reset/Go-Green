const express = require("express");
const bountyController= require("../controllers/bountyController");
const {checkauthenticated} = require("../controllers/middleware/checkauth");

const bountyRouter = express.Router();

bountyRouter.route('/').get(bountyController.getall).post(checkauthenticated, bountyController.createBounty);
bountyRouter.route('/:bountyId').get(bountyController.getbyid);
bountyRouter.route(checkauthenticated, '/claim_bounty/:bountyId').get(bountyController.addClaim).delete(bountyController.removeClaim);
bountyRouter.route(checkauthenticated, '/approve_bounty/:approvedUserId').post(bountyController.approvedBounty);


module.exports = bountyRouter;