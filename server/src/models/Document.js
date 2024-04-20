const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

const Document = sequelize.define("Document", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
});

module.exports = Document;
