const db      = require("../models");
const Posts   = db.posts;
const authors = db.authors;
const Op      = db.Sequelize.Op;

const getAllposts = async () => {
  const result = await Posts.findAll();
  return result
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
  getAllposts
};