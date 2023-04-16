async function logout(req, res) {
  try {
    await new Promise(function (resolve, reject) {
      req.session.destroy(function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    res.redirect("/");
  } catch (err) {
    res.send(err.message);
  }
}

module.exports = {
  logout,
};
