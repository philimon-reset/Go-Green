const multer = require("multer");
const path = require("path");
const express = require("express");
const bountyRouter = express.Router();
const prisma = require("../Storageengine/initPrisma");

const fileRouter = express.Router();

const storage = multer.diskStorage({
  destination: "./Philimon/public/uploads/",
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
	      const updated = await prisma
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
        await Sockets.storeMessage(req.body, req.file);
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
