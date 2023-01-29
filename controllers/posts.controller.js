const db      = require("../models");
const Posts   = db.posts;
const User    = db.user;
const Op      = db.Sequelize.Op;

const getAllposts = async () => {
  const result = await Posts.findAll({
    include: [ { model: User, attributes: ["id","username","name","email"] } ]
  });
  return result
}

const insertPosts = async (obj) => {
  let data = await Posts.create(obj);
  console.log(data.dataValues);
}

const getOnePosts = async (id) => {
  const OnePost = await Posts.findByPk(id);
  return OnePost;
}

const updatePosts = async (obj, id) => {
  await Posts.update(obj, { where: {id: id}});
}

const deletePosts = async (obj, id) => {
  await Posts.update(obj, { where: {id: id}});
}

/* exports.index = async (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Posts.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
}; */

module.exports = {
  getAllposts,
  insertPosts,
  getOnePosts,
  updatePosts
};