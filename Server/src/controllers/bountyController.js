const prisma = require("../Storageengine/initPrisma")

class bountyController {
	static async getall(req, res, next) {
		try {
			const bounties = await prisma.bounty.findMany({});
			return res.json({data: bounties})
		} catch (e) {
			next(e)
		}
	}
	
}

module.exports = bountyController;