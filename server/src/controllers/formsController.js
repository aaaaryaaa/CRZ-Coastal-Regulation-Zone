const db = require("../models/index");
const Form = db.Form;

const createForm = async (id, data, name) => {
  const form = await Form.create({
    id: id,
    data: data,
    name: name,
  });
  return form;
};

const getForms = async () => {
  const forms = await Form.findAll();
  return forms;
};

const formsController = {
  createForm,
  getForms,
};

module.exports = formsController;
