const { authJwt } = require("../middleware");
const { getAllposts, insertPosts, getOnePosts, updatePosts, deletePosts } = require("../controllers/posts.controller");
const { body, check, validationResult } = require("express-validator");


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
          if(allpost.length > 0) res.status(200).json(allpost);
          else res.status(200).json("data not found");
      } catch(e) {
          console.log(e);
          res.sendStatus(500);
      }
    })
    .post([authJwt.verifyToken], [
      //check('author_id', 'Author is not valid').not().isEmpty(),
      check('title', 'Title field is required').not().isEmpty(),
      check('description', 'Description field is required').not().isEmpty(),
      check('content', 'Content field is required').not().isEmpty(),
    ], async (req, res, next) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }
      
      try {

        let obj = {
          author_id   : req.userId, // Middleware authjwt
          title       : req.body.title,
          description : req.body.description,
          content     : req.body.content,
          createdAt   : req.timestamp.format(),
          updatedAt   : req.timestamp.format()
        }

        await insertPosts(obj).then(() => res.status(200).json({ message: 'Posts created.' }));

      } catch(e){
        console.log(e);
        res.sendStatus(400).send({massages: e});
      }
    })

  app.route("/api/posts/:id")
    .all( async (req, res, next) => {
      try{
          const onepost = await getOnePosts(req.params.id);
          if (onepost === null) {
            return res.status(400).json({
              status: 400,
              message: "Data not found!",
            });
          }
          res.onepost = onepost;
          next();
      } catch(e) {
          console.log(e);
          res.sendStatus(404).json({message : "Internal Server Error"});
      }
    })
    .get((req, res, next) => {
      /*const result = {
        status: 200,
        data: res.onepost,
      }; */
      return res
        .header("Content-Type", "application/json")
        .status(200)
        .json(res.onepost);
    })
    .put( [authJwt.verifyToken], async (req, res, next) => {

      try {
        let obj = {
          //author_id   : req.body.author_id,
          title       : req.body.title,
          description : req.body.description,
          content     : req.body.content
        }
  
        const updatepost =  await updatePosts(obj, req.params.id, req.userId).then(()=>{return getOnePosts(req.params.id);});
        res.status(200).json(updatepost);
           
      } catch(e) {
          console.log(e);
          res.sendStatus(400);
      }
   })
  .delete( [authJwt.verifyToken] , [check('id', 'Not found post').not().isEmpty()], async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    try {

      await deletePosts(req.params.id);
      res.status(200).send({massages: "Deleted Post Successfuly!"});

    } catch(e){

      console.log(e);
      res.sendStatus(400);

    }
  })
}