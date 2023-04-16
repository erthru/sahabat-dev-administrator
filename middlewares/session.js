function session(req, res, next) {
  res.locals.sessionUser = req.session.user;
  next();
}

module.exports = session;
