const Sequelize = require("sequelize");
//const mysql     = require('mysql2');
require("dotenv").config();

const config = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USERNAME,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_DATABASE,
  dialect: process.env.DB_CONNECTION,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  }/* ,
  dialectOptions: {
    connectTimeout: 60000,
  }, */
};

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  logging: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
  operatorsAliases: 0
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
