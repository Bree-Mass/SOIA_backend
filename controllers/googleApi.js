const axios = require("axios");
const { Storage } = require("@google-cloud/storage");

module.exports.getPages = (req, res) => {
  const storage = new Storage({
    projectId: "SOIA Project",
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  });
  console.log("Recieved request for Google Pages");

  return storage
    .bucket("soia_bucket")
    .getFiles({ prefix: "books/book-1/SoiA", autoPaginate: false })
    .then(([files]) => {
      if (files.length === 0) {
        console.log("No files found.");
        return res.status(404).json({ message: "No files found." });
      }
      const fileUrls = files.map((file) => {
        return `https://storage.googleapis.com/soia_bucket/${file.name}`;
      });

      return res.status(200).json({ urls: fileUrls });
    })
    .catch((error) => {
      console.error("Error retrieving files:", error);
      return res.status(500).json({ message: "Internal server error." });
    });
};
