const prisma = require("../Storageengine/initPrisma");
const { HttpError } = require("../Util/error");
const {hashedpassword } = require("../Util/hashpassword");
class userController {
	static async getall(req, res, next) {
		try {
			const users = await prisma.user.findMany({});
			return res.json({data: users})
		} catch (e) {
			next(e)
		}
	}
	static async getbyid(req, res, next) {
		try {
			const { userId } = req.params;
			const user = await prisma.user.findUnique({
				where: {
					id: Number(userId)
				}
			});
			return res.json({data: user})
		} catch (e) {
			next(e)
		}
	}
}

module.exports = userController;