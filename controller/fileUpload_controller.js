const path = require('path');
const fs = require('fs');
const File = require('../model/fileUploadModel')
// Upload File Controller
exports.uploadFile = async (req, res) => {
  console.log(req.body)
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    // Save file metadata to the database
    const newFile = new File({
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    const savedFile = await newFile.save();

    res.send({
      message: 'File uploaded successfully!',
      fileId: savedFile._id, // Return the file ID for reference
      fileName: savedFile.filename,
    });
  } catch (err) {
    res.status(500).send('Error uploading file.');
  }
};

// Download File Controller
exports.downloadFile = async (req, res) => {
  console.log(req.params.id)
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).send('File not found.');
    }

    const filePath = file.path;

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).send('File not found.');
      }

      // Send the file for download
      res.download(filePath, file.originalName, (err) => {
        if (err) {
          console.error('Error downloading file:', err);
          res.status(500).send('Error downloading file.');
        }
      });
    });
  } catch (err) {
    res.status(500).send('Error fetching file.');
  }
};


exports.getAllDocuments = async (req, res, next) => {
  try {
    const documents = await File.find(); // Fetch all documents from the database
    return res.status(200).json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return res.status(500).json({ message: "Server error" });
  }
};
