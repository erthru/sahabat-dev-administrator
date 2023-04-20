function session(req, res, next) {
  res.locals.sessionUser = req.session.user;
  res.locals.path = req.path;
  res.locals.toastSuccess = req.flash("toastSuccess");
  res.locals.toastWarning = req.flash("toastWarning");
  res.locals.toastError = req.flash("toastError");
  next();
}

module.exports = session;
