const express = require('express');
const multer = require('multer');
const fileController = require('../controller/fileUpload_controller')
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });


router.post('/upload/document', upload.single('file'), fileController.uploadFile);
router.get('/download/document/:id', fileController.downloadFile);
router.get('/download/document', fileController.getAllDocuments);

module.exports = router;
