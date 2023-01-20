const { authJwt } = require("../middleware");
const { getAllauthors } = require("../controllers/authors.controller");

module.exports = (app) => {

  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //app.use([authJwt.verifyToken]); //all route verify token
  //app.get([authJwt.verifyToken], "/api/authors",  controller.index);  //single route verify token

  app.route("/api/authors/?")
  .get(async (req, res, next)=>{
      try {
          const allauthors = await getAllauthors();
          res.status(200).json(allauthors);
      } catch(e) {
          console.log(e);
          res.sendStatus(500);
      }
  });

};