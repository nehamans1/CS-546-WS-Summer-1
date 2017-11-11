const palindromecheckerRoutes = require("./palindromechecker");

const constructorMethod = app => {
  app.use("/palindromechecker", palindromecheckerRoutes);

  app.use("*", (req, res) => {
    res.redirect("/palindromechecker/static");
  });
};

module.exports = constructorMethod;
