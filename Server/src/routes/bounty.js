const express = require("express");
const bountyController= require("../controllers/bountyController");
const {checkauthenticated, checkOwnerClaim} = require("../controllers/middleware/checkauth");
const bountyRouter = express.Router();

bountyRouter.route('/:bountyId').get(bountyController.getbyid).delete(checkauthenticated, bountyController.deleteBounty);
bountyRouter.route('/').get(bountyController.getall).post(checkauthenticated, bountyController.createBounty);
bountyRouter.use(checkauthenticated);
bountyRouter.route("/user_id/").get( bountyController.getByUserId)
bountyRouter.route('/approveBounty/:bountyId').patch( bountyController.approveBounty);
bountyRouter.route('/approveClaim/').patch(bountyController.approveClaim);
bountyRouter.route('/claim/:bountyId').post(checkOwnerClaim, bountyController.addClaim).delete(checkOwnerClaim, bountyController.removeClaim);
// bountyRouter.route(checkauthenticated, '/approve_bounty/:approvedUserId').post(bountyController.approvedBounty);

// bountyRouter.route('/confirmPlant'.post(bountyController.approveBounty));
// bountyRouter.route(checkauthenticated, '/claim_bounty/:bountyId').get(bountyController.addClaim).delete(bountyController.removeClaim);
// bountyRouter.route(checkauthenticated, '/approve_bounty/:approvedUserId').post(bountyController.approvedBounty);
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any

module.exports = bountyRouter;