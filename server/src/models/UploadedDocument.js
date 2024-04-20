const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

const UploadedDocuments = sequelize.define("uploadedDocument", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  documentId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  applicationId: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  data: {
    type: Sequelize.BLOB("long"),
    allowNull: true,
  },
  documentType: {
    type: Sequelize.ENUM("png", "jpeg", "pdf", "jpg"),
    allowNull: true,
  },
});

module.exports = UploadedDocuments;
