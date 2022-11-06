var multer  = require('multer')
// var upload = multer({ dest: '.../../../public' })
const express = require("express");
// const prisma = require("../Storageengine/initPrisma");
const fileRouter = express.Router();

const storage_before = multer.diskStorage({
  destination: (req, file, cb) => {
	cb(null, '../Client/public/uploads/before')
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const storage_after = multer.diskStorage({
	destination: (req, file, cb) => {
	      cb(null, '../Client/public/uploads/after')
	},
	filename: (req, file, cb) => {
	  cb(
	    null,
	    file.fieldname + "-" + Date.now() + path.extname(file.originalname)
	  );
	},
});

const upload_before = multer({
storage: storage_before,
});
const upload_after = multer({
	storage: storage_after,
      });

fileRouter.post("/before", upload_after.single("before_pic"), async (req, res) => {
	const { bountyId } = req.body;
	const filename = req.file.fieldname + "-" + Date.now() + path.extname(req.file.originalname);

	(req, res, async (err) => {
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
		await prisma.bounty.update({
		where: {
			id: bountyId === undefined ? undefined : Number(bountyId)
		},
		data: {
			Before_pic: `Client/public/uploads/${Date.now() + "-" + filename}`,
		}
	      })
	      console.log(req.file);
	      res.json({
		message: "File Uploaded!",
		file: `uploads/${filename}`,
	      });
	    }
	  }
	})();
      });

fileRouter.post("/after", upload_before.single("after_pic"), async (req, res) => {
const { bountyId, location_end } = req.body;
const filename = req.file.fieldname + "-" + Date.now() + path.extname(req.file.originalname);

(req, res, async (err) => {
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
	await prisma.bounty.update({
	where: {
		id: bountyId === undefined ? undefined : Number(bountyId)
	},
	data: {
		After_pic: `Client/public/uploads/${Date.now() + "-" + filename}`,
		location_end
	}
	})
	console.log(req.file);
	res.json({
	message: "File Uploaded!",
	file: `uploads/${filename}`,
	});
	}
	}
})();
});

module.exports = fileRouter;
