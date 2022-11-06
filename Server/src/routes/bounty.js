const express = require("express");
const bountyController= require("../controllers/bountyController");
const {checkauthenticated, checkOwnerClaim} = require("../controllers/middleware/checkauth");
const bountyRouter = express.Router();

bountyRouter.route('/:bountyId').get(bountyController.getbyid).delete(checkauthenticated, bountyController.deleteBounty);
bountyRouter.route('/').get(bountyController.getall).post(checkauthenticated, bountyController.createBounty);
bountyRouter.use(checkauthenticated);
bountyRouter.route("/bounty_me/").get(bountyController.getmybounty);
bountyRouter.route("/user_id/").get(bountyController.getByUserId)
bountyRouter.route('/approveBounty/').patch(bountyController.approveBounty);
bountyRouter.route('/approveClaim/').patch(bountyController.approveClaim);
bountyRouter.route('/claim/:bountyId').post(checkOwnerClaim, bountyController.addClaim).delete(checkOwnerClaim, bountyController.removeClaim);

module.exports = bountyRouter;