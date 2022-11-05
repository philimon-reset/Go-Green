const express = require("express");
const bountyController= require("../controllers/bountyController");
const {checkauthenticated} = require("../controllers/middleware/checkauth");

const bountyRouter = express.Router();

bountyRouter.route("/user_id/").get(checkauthenticated, bountyController.getByUserId)
bountyRouter.route('/').get(bountyController.getall).post(checkauthenticated, bountyController.createBounty);
bountyRouter.route('/:bountyId').get(bountyController.getbyid).delete(checkauthenticated, bountyController.deleteBounty);
bountyRouter.route('/approveBounty/:bountyId').patch(checkauthenticated, bountyController.approveBounty);
bountyRouter.route('/approveClaim/').patch(checkauthenticated, bountyController.approveClaim);

// bountyRouter.route('/confirmPlant'.post(bountyController.approveBounty));
// bountyRouter.route(checkauthenticated, '/claim_bounty/:bountyId').get(bountyController.addClaim).delete(bountyController.removeClaim);
// bountyRouter.route(checkauthenticated, '/approve_bounty/:approvedUserId').post(bountyController.approvedBounty);
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any

module.exports = bountyRouter;