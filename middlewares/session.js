function session(req, res, next) {
  res.locals.sessionUser = req.session.user;
  res.locals.path = req.path;
  next();
}

module.exports = session;
