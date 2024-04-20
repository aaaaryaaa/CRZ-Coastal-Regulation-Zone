const db = require("../models/index");
const UploadedDocument = db.UploadedDocument;

const createUploadedDocument = async (
  documentId,
  applicationId,
  data,
  name
) => {
  var uploadedDocument = await UploadedDocument.findOne({
    where: {
      applicationId: applicationId,
      documentId: documentId,
    },
  });
  if (
    uploadedDocument === null ||
    uploadedDocument === undefined ||
    uploadedDocument.length === 0
  ) {
    var uploadedDocument = await UploadedDocument.create({
      documentId: documentId,
      applicationId: applicationId,
      data: data,
      documentType: name != null ? name.split(".").pop() : null,
    });
  } else {
    await UploadedDocument.update(
      {
        data: data,
        documentType: name.split(".").pop(),
      },
      {
        where: {
          applicationId: applicationId,
          documentId: documentId,
        },
      }
    );
  }

  return uploadedDocument;
};

const getAllUploadedDocs = async (applicationId) => {
  const uploadDocuments = await UploadedDocument.findAll({
    where: {
      applicationId: applicationId,
    },
    include: [
      {
        model: db.Document,
        as: "documents",
      },
    ],
  });
  return uploadDocuments;
};

const uploadedDocumentController = {
  createUploadedDocument,
  getAllUploadedDocs,
};

module.exports = uploadedDocumentController;
