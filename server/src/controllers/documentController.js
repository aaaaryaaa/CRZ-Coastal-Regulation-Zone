const db = require("../models/index");
const Document = db.Document;

const createDocument = async (id, name, description) => {
  const document = await Document.create({
    id: id,
    name: name,
    description: description,
  });
  return document;
};

const getAllDocuments = async () => {
  const documents = await Document.findAll({});
  return documents;
};

const documentController = {
  createDocument,
  getAllDocuments,
};

module.exports = documentController;
