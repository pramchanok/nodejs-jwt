module.exports = (sequelize, Sequelize) => {
    const posts = sequelize.define("posts", {
        author_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  
    return posts;
  
  };
  