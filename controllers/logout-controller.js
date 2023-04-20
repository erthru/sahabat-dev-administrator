async function get(req, res) {
  try {
    req.session = null;
    res.redirect("/");
  } catch (err) {
    res.send(err.message);
  }
}

module.exports = {
  get,
};
