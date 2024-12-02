const { Storage } = require("@google-cloud/storage");

module.exports.getPages = (req, res) => {
  const storage = new Storage({
    projectId: "SOIA Project",
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  });

  return storage
    .bucket("soia_bucket")
    .getFiles({ prefix: "books/book-1/SoiA", autoPaginate: false })
    .then(([files]) =>
      files.length === 0
        ? res.status(404).json({ message: "No files found." })
        : res.status(200).json({
            urls: files.map(
              (file) =>
                `https://storage.googleapis.com/soia_bucket/${file.name}`
            ),
          })
    )
    .catch(() => res.status(500).json({ message: "Internal server error" }));
};
