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
  let transaction
  try {
    transaction = await db.sequelize.transaction()
    await Posts.create(obj, { transaction }); //let data    = 
    await transaction.commit();
  } catch(error) {
    if (transaction) await transaction.rollback();
  }
  //console.log(data.dataValues);
}

const getOnePosts = async (id) => {
  const OnePost = await Posts.findByPk(id);
  return OnePost;
}

const updatePosts = async (obj, id, uid) => {
  let transaction
  try { 
    transaction = await db.sequelize.transaction()
    await Posts.update(obj, { where: { [Op.and]: [ { id: id }, { author_id: uid } ] } });
    await transaction.commit();
  } catch(e) {
    if (transaction) await transaction.rollback();
    throw Error(error);
  }
    
}

const deletePosts = async (id) => {
  let transaction
  try {
    transaction = await db.sequelize.transaction()
    await Posts.destroy({ where: { id: id } });
    await transaction.commit();
  } catch(e){
    if (transaction) await transaction.rollback();
  }
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
  updatePosts,
  deletePosts
};