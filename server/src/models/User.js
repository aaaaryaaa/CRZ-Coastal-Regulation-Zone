const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

const User = sequelize.define("User", {
  phone: {
    type: Sequelize.STRING({
      length: 10,
    }),
    allowNull: false,
    primaryKey: true,
  },
  otp: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  otp_timestamp: {
    type: Sequelize.DATE,
  },
  last_logged_in: {
    type: Sequelize.DATE,
  },
});

module.exports = User;
