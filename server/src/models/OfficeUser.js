const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

const OfficeUser = sequelize.define("OfficeUser", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  last_logged_in: {
    type: Sequelize.DATE,
  },
});

module.exports = OfficeUser;
