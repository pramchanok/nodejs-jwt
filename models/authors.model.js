module.exports = (sequelize, Sequelize) => {
  const authors = sequelize.define("authors", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    birthdate: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return authors;

};
