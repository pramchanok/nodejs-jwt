const db    = require("../config/db.config.js");
db.user     = require("../models/user.model.js")(db.sequelize, db.Sequelize);
db.role     = require("../models/role.model.js")(db.sequelize, db.Sequelize);
db.posts    = require("../models/posts.model.js")(db.sequelize, db.Sequelize);
db.authors  = require("../models/authors.model.js")(db.sequelize, db.Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.authors.hasMany(db.posts, {
  sourceKey: 'id',
  foreignKey: 'author_id',
  as: 'posts',
});

/* db.posts.belongsTo(db.authors, {
  foreignKey: {
    field: 'author_id',
    allowNull: false
  }
});

db.authors.belongsTo(db.posts, {
  foreignKey: {
    field: 'id',
    allowNull: false
  }
}); */



db.ROLES = ["user", "admin", "moderator"];

module.exports = db;