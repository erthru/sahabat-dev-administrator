function get(req, res) {
  try {
    if (req.session.user) {
      res.redirect("/dashboard");
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    res.send(err.message);
  }
}

module.exports = {
  get,
};
