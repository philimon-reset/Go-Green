const { bounty } = require("../Storageengine/initPrisma");
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
	static async getByUserId(req, res, next) {
		console.log(5)
		try {
			const bounties = await prisma.bounty.findMany({
				where: {
					sponsor: {
						id: req.user.id
					}
				  },
			});
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
					city_id: city_id === undefined ? undefined : Number(city_id),
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
	static async approveBounty(req, res, next) {
		try {
			const { bountyId } = req.params;
			const bounty = await prisma.bounty.findUnique({
				where: {
					id: Number(bountyId)
				}
			});
			if (req.user.id == bounty.sponsorId){
				await prisma.bounty.update({
					where: {
						id: Number(bountyId)
					},
					data: {
						Success: true,
					},
				});
				return res.status(200).json({
					"message" : "approved successfully"
				});
			}
			else{
				return res.status(404).json({
					"message" : "user can't approve another's bounty successfully"
				});
			}
		} catch (e) {
			next(e)
		}

	}
	static async deleteBounty(req, res, next) {
		try {
			const { bountyId } = req.params;
			const bounty = await prisma.bounty.findUnique({
				where: {
					id: Number(bountyId)
				}
			});
			if (req.user.id == bounty.sponsorId){
				await prisma.bounty.delete({
					where: {
						id: Number(bountyId)
					}
				});
				return res.status(200).json({
					"message" : "deleted successfully"
				});
			}
			else{
				return res.status(404).json({
					"message" : "user can't delete another's bounty successfully"
				});
			}
		} catch (e) {
			next(e)
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
		} catch (e) {
			next(e)
		}
	}

	static async approveClaim(req, res, next) {
		try {
			const { bountyId, planterId } = req.body;
			
			const bounty = await prisma.bounty.findUnique({
				where: {
					id: Number(bountyId)
				}
			});
			if (req.user.id == bounty.sponsorId){
				await prisma.bounty.update({
					where: {
						id: Number(bountyId)
					},
					data: {
						Appovered: true,
						planterId: planterId
					},
				});
				return res.status(200).json({
					"message" : "approved successfully"
				});
			}
			else{
				return res.status(404).json({
					"message" : "user can't approve another's bounty successfully"
				});
			}
		} catch (e) {
			next(e)
		}

	}

	
	
}

module.exports = bountyController;