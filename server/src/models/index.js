const Sequelize = require("sequelize");
const sequelize = require("../database/connection.js");
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require("./User.js");
db.Application = require("./Application.js");
db.Form = require("./Form.js");
db.Document = require("./Document");
db.UploadedDocument = require("./UploadedDocument");
db.OfficeUser = require("./OfficeUser");
db.sequelize.sync({ force: false }).then(() => {
  logger.info("Sync Done....");
});

db.User.hasMany(db.Application, { as: "applications", foreignKey: "phone" });
db.Application.belongsTo(db.User, { as: "users", foreignKey: "phone" });

db.Application.hasMany(db.UploadedDocument, {
  as: "uploadedDocuments",
  foreignKey: "applicationId",
});
db.UploadedDocument.belongsTo(db.Application, {
  as: "applications",
  foreignKey: "applicationId",
});

db.Document.hasMany(db.UploadedDocument, {
  as: "uploadedDocuments",
  foreignKey: "documentId",
});
db.UploadedDocument.belongsTo(db.Document, {
  as: "documents",
  foreignKey: "documentId",
});

module.exports = db;
