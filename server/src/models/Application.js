const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

const Application = sequelize.define("Application", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  taluk: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  village: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  surveyNo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.ENUM(
      "Residential Conversion",
      "Commercial Conversion",
      "Residential Construction",
      "Commercial/Govt. Projects"
    ),
    allowNull: false,
  },
  formOne: {
    type: Sequelize.BLOB("long"),
    allowNull: false,
  },
  formOneType: {
    type: Sequelize.ENUM("png", "jpeg", "pdf", "jpg"),
    allowNull: false,
  },
  rtc: {
    type: Sequelize.BLOB("long"),
    allowNull: false,
  },
  rtcType: {
    type: Sequelize.ENUM("png", "jpeg", "pdf", "jpg"),
    allowNull: false,
  },
  surveySketch: {
    type: Sequelize.BLOB("long"),
    allowNull: false,
  },
  surveySketchType: {
    type: Sequelize.ENUM("png", "jpeg", "pdf", "jpg"),
    allowNull: false,
  },
  challan: {
    type: Sequelize.BLOB("long"),
    allowNull: false,
  },
  challanType: {
    type: Sequelize.ENUM("png", "jpeg", "pdf", "jpg"),
    allowNull: false,
  },
  approval: {
    type: Sequelize.BLOB("long"),
  },
  approvalType: {
    type: Sequelize.ENUM("png", "jpeg", "pdf", "jpg"),
    allowNull: true,
  },
  phone: {
    type: Sequelize.STRING({
      length: 10,
    }),
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("pending", "seen", "ready", "approved", "rejected"),
    defaultValue: "pending",
  },
  created_on: {
    type: Sequelize.DATE,
  },
  updated_on: {
    type: Sequelize.DATE,
  },
});

module.exports = Application;
