function index(req, res) {
  try {
    res.render("pages/index");
  } catch (err) {
    res.send(err.message);
  }
}

module.exports = {
  index,
};
