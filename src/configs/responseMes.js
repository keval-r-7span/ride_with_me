exports.trueResponse = (res, data) => {
  return res.status(200).json({
    sucess: true,
    data,
    message: "OK",
  });
};

exports.falseResponse = (res) => {
  return res.status(200).json({
    sucess: false,
    message: "ERROR",
  });
};

exports.falseResponse = (res, err) => {
  return res.status(404).json({
    sucess: false,
    message: "error occured "+err,
  });
};
