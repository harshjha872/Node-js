exports.getdata = (req, res, next) => {
  res.json({
    message: "Here is the data u asked for",
  });
};

exports.sendData = (req, res, next) => {
  const message = req.body.message;
  const imageUrl = req.file;
  res.json({
    message: "Success",
    image: imageUrl,
  });
};
