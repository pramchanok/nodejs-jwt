const { authJwt } = require("../middleware");
const controller = require("../controllers/authors.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //[authJwt.verifyToken],
  app.get("/api/authors",  controller.index);

};