const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

const Form = sequelize.define("Form", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  data: {
    type: Sequelize.BLOB("long"),
    allowNull: false,
  },
});

module.exports = Form;
