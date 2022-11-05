const prisma = require("../../Storageengine/initPrisma");

async function checkOwnerClaim(req, res, next) {
	const {bountyId} = req.params;
	const bounty = await prisma.bounty.findUnique({
		where: {
			id: Number(bountyId),
		}
	})
	if (bounty.sponsorId !== req.user.id) {
		return next();
	}
	return res.status(301).json({err: "Owner can't claim their own bounty"})
}

async function checkauthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	return res.status(301).json({err: "Not authenticated"})
}

async function checknotauthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return res.status(301).json({err: "Already authenticated"});
	}
	return next();
}

module.exports = {checkauthenticated, checknotauthenticated,  checkOwnerClaim};