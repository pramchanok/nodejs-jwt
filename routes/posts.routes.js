const { authJwt } = require("../middleware");
const { getAllposts } = require("../controllers/posts.controller");

module.exports = (app) => {

  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //app.use([authJwt.verifyToken]); //all route verify token
  //app.get([authJwt.verifyToken], "/api/posts",  controller.index);  //single route verify token

  app.route('/api/posts/?')
  .get(async (req, res, next)=>{
    try {
        const allpost = await getAllposts();
        res.status(200).json(allpost);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
 });

};