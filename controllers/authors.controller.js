const db = require("../models");
const authors = db.authors;
const Op = db.Sequelize.Op;

const getAllauthors = async () => {
  const result = await authors.findAll();
  return result
}

module.exports = {
  getAllauthors
}

/* exports.index = async (req, res) => {
  const first_name = req.query.first_name;
  var condition = first_name ? { first_name: { [Op.like]: `%${first_name}%` } } : null;
  authors.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
  //res.status(200).send("All Authors");
}; */
