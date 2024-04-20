const db = require("../models/index");
const OfficeUser = db.OfficeUser;

const createOfficeUser = async (email, password) => {
  const officeUser = await OfficeUser.create({
    email: email,
    password: password,
  });
  return officeUser;
};

const findOfficeUser = async (email) => {
  const officeUser = await OfficeUser.findOne({
    where: {
      email: email,
    },
  });
  return officeUser;
};

const officeUserController = {
  createOfficeUser,
  findOfficeUser,
};

module.exports = officeUserController;
