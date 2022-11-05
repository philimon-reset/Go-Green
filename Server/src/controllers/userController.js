const prisma = require("../Storageengine/initPrisma");
const { HttpError } = require("../Util/error");
const {hashedpassword, unhashpassword, hashedpassword } = require("../Util/hashpassword");
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
	static async register(req, res, next) {
		try {
			const {email, password, pic, name, PayPal } = req.body;
			const hashed = hashedpassword(password);
			const created = await prisma.user.create({
				data: {
					email,
					name,
					password: hashed,
					wallet,
					PayPal,
					pic,
				}
			})
			if (!created) {
				throw new HttpError(422, "User Register failed");
			}
			return res.json({data: { created }, message: "User registered"});
		} catch (e) {
			next(e)
		}
	}
}

module.exports = userController;