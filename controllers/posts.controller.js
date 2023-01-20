const db      = require("../models");
const Posts   = db.posts;
const authors = db.authors;
const Op      = db.Sequelize.Op;

const getAllposts = async () => {
  const result = await Posts.findAll();
  return result
}

const insertPosts = async (obj) => {
  await Posts.create(obj);
}

const getOnePosts = async (id) => {
  const OnePost = await Posts.findByPk(id);
  return OnePost;
}

const updatePosts = async (obj, id) => {
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