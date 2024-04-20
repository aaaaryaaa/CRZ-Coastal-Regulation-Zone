const db = require("../models/index");

const User = db.User;

const checkUser = async (phone) => {
  var user = await User.findOne({
    where: {
      phone: phone,
    },
  });
  return user;
};

const createUser = async (phone) => {
  var user = await User.create({
    phone: phone,
  });
  return user;
};

const userController = {
  checkUser,
  createUser,
};

module.exports = userController;
