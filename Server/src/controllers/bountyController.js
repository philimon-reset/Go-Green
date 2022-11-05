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
	static async getbyid(req, res, next) {
		try {
			const { bountyId } = req.params;
			const bounty = await prisma.bounty.findUnique({
				where: {
					id: Number(bountyId)
				}
			});
			return res.json({data: bounty})
		} catch (e) {
			next(e)
		}
	}
}

module.exports = bountyController;