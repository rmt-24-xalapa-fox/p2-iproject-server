function errorHandler(res, req, next) {
  res.send("Error nih");
}
module.exports = { errorHandler };
