exports.getdata = (req, res, next) => {
  res.json({
    message: "Here is the data u asked for",
  });
};

exports.sendData = (req, res, next) => {
  const message = req.body.message;
  const image = req.file;
  console.log(req.file);
  console.log(message);
  console.log(image);
  res.json({
    message: "Success",
  });
  // console.log("done");
};
