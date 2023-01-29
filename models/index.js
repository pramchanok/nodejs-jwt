const db    = require("../config/db.config");
db.user     = require("../models/user.model")(db.sequelize, db.Sequelize);
db.role     = require("../models/role.model")(db.sequelize, db.Sequelize);
db.posts    = require("../models/posts.model")(db.sequelize, db.Sequelize);
db.authors  = require("../models/authors.model")(db.sequelize, db.Sequelize);

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

db.ROLES = ["user", "admin", "moderator"];

db.sequelize.sync(err => {
  console.log('Database Sync Error', err);
});

module.exports = db;