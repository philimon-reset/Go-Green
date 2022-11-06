const multer = require("multer");
const path = require("path");
const express = require("express");
const prisma = require("../Storageengine/initPrisma");

const fileRouter = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
}).single("myImage");

fileRouter.post("/before", (req, res) => {
	const { bountyId } = req.body;
	upload(req, res, async (err) => {
	console.log(req.file);
	  if (err) {
	    res.status(400).json({
	      err,
	    });
	  } else {
	    if (req.file == undefined) {
	      res.status(400).json({
		err: "Error: No File Selected!",
	      });
	    } else {
	      const updated = await prisma.bounty.update({
		where: {
			id: bountyId === undefined ? undefined : Number(bountyId)
		},
		data: {
			Before_pic: `Client/public/uploads/${Date.now() + "-" + req.file.fileName}`,
		}
	      })
	      console.log(req.file);
	      res.json({
		message: "File Uploaded!",
		file: `uploads/${req.file.filename}`,
	      });
	    }
	  }
	});
      });

      fileRouter.post("/after", (req, res) => {
	const { bountyId, location_end } = req.body;
	upload(req, res, async (err) => {
	  if (err) {
	    res.status(400).json({
	      err,
	    });
	  } else {
	    if (req.file == undefined) {
	      res.status(400).json({
		err: "Error: No File Selected!",
	      });
	    } else {
	      const updated = await prisma.bounty.update({
		where: {
			id: bountyId === undefined ? undefined : Number(bountyId)
		},
		data: {
			After_pic: `Client/public/uploads/${Date.now() + "-" + req.file.fileName}`,
			location_end
		}
	      })
	      console.log(req.file);
	      res.json({
		message: "File Uploaded!",
		file: `uploads/${req.file.filename}`,
	      });
	    }
	  }
	});
      });
module.exports = fileRouter;
