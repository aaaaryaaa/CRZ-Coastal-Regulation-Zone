const db = require("../models/index");
const Application = db.Application;

const createApplication = async (
  phone,
  name,
  email,
  address,
  surveyNo,
  village,
  taluk,
  type,
  formOne,
  rtc,
  surveySketch,
  challan,
  formOneType,
  rtcType,
  surveySketchType,
  challanType
) => {
  var applicationId = "CRZ" + new Date().getTime() + phone;
  const application = await Application.create({
    id: applicationId,
    phone: phone,
    timestamp: new Date(),
    name: name,
    email:email,
    address: address,
    surveyNo: surveyNo,
    village: village,
    taluk: taluk,
    formOne: formOne,
    rtc: rtc,
    surveySketch: surveySketch,
    challan: challan,
    type: type,
    status: "pending",
    created_on: Date.now(),
    updated_on: Date.now(),
    formOneType: formOneType,
    rtcType: rtcType,
    surveySketchType: surveySketchType,
    challanType: challanType,
  }).catch((e) => {
    logger.error(e);
  });
  return application;
};

const findApplicationsWithoutDocuments = async (phone) => {
  const applications = await Application.findAll({
    attributes: [
      "id",
      "taluk",
      "village",
      "status",
      "phone",
      "surveyNo",
      "type",
      "name",
      "email",
      "address",
      "created_on",
      "updated_on",
    ],
    where: {
      phone: phone,
    },
    raw: true,
  });
  return applications;
};

const findApplicationWithType = async (type) => {
  const applications = await Application.findAll({
    where: {
      type: type,
    },
    attributes: [
      "id",
      "taluk",
      "village",
      "status",
      "phone",
      "surveyNo",
      "type",
      "name",
      "email",
      "address",
      "challan",
      "created_on",
      "updated_on",
    ],
  });

  return applications;
};

const findApplicationWithId = async (applicationId) => {
  const application = await Application.findOne({
    where: {
      id: applicationId,
    },
    include: [
      {
        model: db.UploadedDocument,
        as: "uploadedDocuments",
      },
    ],
  });
  return application;
};

const uploadApproval = async (data, id) => {
  await Application.update(
    {
      approval: data,
      status: "approved",
      updated_on: Date.now(),
    },
    {
      where: {
        id: id,
      },
    }
  );
};

const uploadRejection = async (data, id) => {
  await Application.update(
    {
      approval: data,
      status: "rejected",
      updated_on: Date.now(),
    },
    {
      where: {
        id: id,
      },
    }
  );
};

const download = async (id) => {
  const application = await Application.findOne({
    where: {
      id: id,
    },
  });
  if (application.status === "rejected" || application.status === "approved") {
    return application.approval;
  } else {
    return null;
  }
};

const applicationController = {
  createApplication,
  findApplicationsWithoutDocuments,
  findApplicationWithType,
  findApplicationWithId,
  uploadApproval,
  uploadRejection,
  download,
};

module.exports = applicationController;
