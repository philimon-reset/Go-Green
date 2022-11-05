const prisma = require("../Storageengine/initPrisma")
const {HttpError, ValidationError} = require("../Util/error");
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

	static async createBounty(req, res, next) {
		try {
			const { userId } = req.params;
			
			const user = await prisma.user.findUnique({
				where: {
					id: Number(userId),
				}
			})
			if (!user) {
				throw new HttpError(404, "Sponsor not found");
			}
			const created = await prisma.bounty.create({
				data: {
					sponsor: user
				}
			})
			return res.json({message: "Bounty Created", data: { created }});
		} catch (e) {
			next(e);
		}
	}
}

module.exports = bountyController;