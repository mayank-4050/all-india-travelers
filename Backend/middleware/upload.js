const multer = require("multer");
const path = require("path");
const fs = require("fs");

/*
=================================================
📁 Upload Folder Setup
=================================================
*/

const uploadPath = path.join(__dirname, "../uploads");

// Ensure uploads folder exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

/*
=================================================
📦 Multer Storage Configuration
=================================================
*/

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {

    // Clean filename
    const cleanName = file.originalname
      .replace(/\s+/g, "_")
      .replace(/[^\w.-]/g, "");

    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    const ext = path.extname(cleanName).toLowerCase();

    cb(null, uniqueName + ext);
  }

});

/*
=================================================
🛡 File Type Validation
=================================================
*/

const fileFilter = (req, file, cb) => {

  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "application/pdf"
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG and PDF files are allowed"), false);
  }
};

/*
=================================================
⚙ Base Multer Instance
=================================================
*/

const baseUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB per file
  }
});

/*
=================================================
📄 Agent Multi-Document Upload
=================================================
Required Fields:
- idProofImage
- aadharCard
- gumastaCertificate
- officePhoto
- ownerSelfie
=================================================
*/

const uploadAgentDocuments = baseUpload.fields([
  { name: "idProofImage", maxCount: 1 },
  { name: "aadharCard", maxCount: 1 },
  { name: "gumastaCertificate", maxCount: 1 },
  { name: "officePhoto", maxCount: 1 },
  { name: "ownerSelfie", maxCount: 1 }
]);

module.exports = {
  uploadAgentDocuments
};
