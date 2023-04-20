function get(req, res) {
  try {
    res.render("pages/dashboard/index", {
      title: `Dashboard | ${process.env.APP_NAME}`,
      navbarTitle: "Dashboard",
    });
  } catch (err) {
    res.send(err.message);
  }
}

module.exports = {
  get,
};
