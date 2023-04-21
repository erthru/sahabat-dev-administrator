function imageUpload(req, res) {
  try {
    const { filename } = req.file;

    res.status(201).json({
      error: 0,
      data: {
        url: `${req.protocol}://${req.headers.host}/uploads/${filename}`,
        filename,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: 1,
      message: err.message,
    });
  }
}

module.exports = {
  imageUpload,
};
