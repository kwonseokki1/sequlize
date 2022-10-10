"use strict";
const User = require("./user");
const Comment = require("./comment");

const Sequelize = require("sequelize");
const process = require("process");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
db.sequelize = sequelize;

db.User = User;
db.Comment = Comment;

// init 실행시 테이블이 모델로 연결됩니다.
User.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Comment.associate(db);

module.exports = db;
