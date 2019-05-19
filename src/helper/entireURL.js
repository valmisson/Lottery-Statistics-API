module.exports = (req, res, next) => {
  req.entireURL = req.protocol + '://' + req.get('host') + req.originalUrl

  next()
}
