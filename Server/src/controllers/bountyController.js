const prisma = require("../Storageengine/initPrisma")
const {HttpError, ValidationError} = require("../Util/error");
class bountyController {
	static async getall(req, res, next) {
		try {
			let bounties;
			if (req.isAuthenticated()) {
				bounties = await prisma.bounty.findMany({
					where: {
						Appovered: false,
						sponsor: {
							NOT: {
								id: req.user.id
							}
						}
					}
				});
			}
			else {
				bounties = await prisma.bounty.findMany({});
			}
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
			const {price, treeId, city_id } = req.body;
			const created = await prisma.bounty.create({
				data: {
					sponsor: {
						connect: {
							id: req.user.id
						}
					},
					City: {
						connect: {
							id: city_id === undefined ? undefined : Number(city_id),
						}
					},
					Price: Number(price),
					tree: {
						connect: {
							id: treeId === undefined ? undefined : Number(treeId)
						}
					}

				}
			})
			if (!created) {
				throw new HttpError(401, "Creation failed");
			}
			return res.json({message: "Bounty Created", data: { created }});
		} catch (e) {
			next(e);
		}
	}
	static async addClaim(req, res, next) {
		try {
			const {bountyId} = req.params;
			const added = await prisma.claims.create({
				data: {
					bountyId: Number(bountyId),
					userId: req.user.id,
				}
			})
			if (!added) {
				throw new HttpError(401, "Add Claim failed");
			}
			return res.json({data: added});
		} catch (e) {
			next(e)
		}
	}
	static async removeClaim(req, res, next) {
		try {
			const {bountyId} = req.params;
			const removed = await prisma.claims.delete({
				where: {
					userId_bountyId: {
						bountyId: Number(bountyId),
						userId: req.user.id,
					}
				}
			})
			if (!removed) {
				throw new HttpError(401, "remove Claim failed");
			}
			return res.json({message: "Claim removed"});
		} catch (e) {
			next(e)
		}
	}
}

module.exports = bountyController;