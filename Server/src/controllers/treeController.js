const prisma = require("../Storageengine/initPrisma")

class treeController {
	static async getall(req, res, next) {
		try {
			const trees = await prisma.tree.findMany({});
			return res.json({data: trees})
		} catch (e) {
			next(e)
		}
	}
	static async getbyid(req, res, next) {
		try {
			const { treeId } = req.params;
			const tree = await prisma.tree.findUnique({
				where: {
					id: Number(treeId)
				}
			});
			return res.json({data: tree})
		} catch (e) {
			next(e)
		}
	}
	static async addTree(req, res, next) {
		try {
			const {name, price, pic, description} = req.body;
			const tree = await prisma.tree.create({
                data: {
					name,
                    price: price==undefined? undefined: Number(price),
                    pic,
                    description: description.substring(0,100),
				}
            })
			return res.json({data: tree})
		} catch (e) {
			next(e)
		}
	}
}

module.exports = treeController;