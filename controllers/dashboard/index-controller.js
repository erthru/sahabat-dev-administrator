function get(req, res) {
  try {
    res.render("pages/dashboard/index", {
      layout: "layouts/layout-dashboard",
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
