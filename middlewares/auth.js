function required(req, res, next) {
  try {
    if (!req.session.user) {
      res.redirect("/login");
      return;
    }

    next();
  } catch (err) {
    res.send(err.message);
  }
}

function guest(req, res, next) {
  try {
    if (req.session.user) {
      res.redirect("/dashboard");
      return;
    }

    next();
  } catch (err) {
    res.send(err.message);
  }
}

module.exports = {
  required,
  guest,
};
