exports.getdata = (req, res, next) => {
  res.status(201).json({
    message: "succesful request",
  });
};

exports.postreq = (req, res, next) => {
  const title = req.body.title;
  const discription = req.body.discription;
  const file = req.file;
  console.log(file);
  res.status(201).json({
    message: "successful post req",
    content: {
      title: title,
      discription: discription,
    },
  });
};
