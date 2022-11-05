const express = require("express");
const bountyController= require("../controllers/bountyController");
const {checkauthenticated, checkOwnerClaim} = require("../controllers/middleware/checkauth");
const bountyRouter = express.Router();

bountyRouter.route('/:bountyId').get(bountyController.getbyid);

bountyRouter.use(checkauthenticated);
bountyRouter.route('/').get(bountyController.getall).post(bountyController.createBounty);
bountyRouter.route('/claim/:bountyId').post(checkOwnerClaim, bountyController.addClaim).delete(checkOwnerClaim, bountyController.removeClaim);
// bountyRouter.route(checkauthenticated, '/approve_bounty/:approvedUserId').post(bountyController.approvedBounty);


module.exports = bountyRouter;