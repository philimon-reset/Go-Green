const prisma = require("../Storageengine/initPrisma")

class cityController {
	static async getall(req, res, next) {
		try {
			const trees = await prisma.city.findMany({});
			return res.json({data: trees})
		} catch (e) {
			next(e)
		}
	}
}

module.exports = cityController;