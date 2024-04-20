const express = require("express");
const formsController = require("../controllers/formsController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Blob } = require("buffer");
const saltRounds = 10;
require("dotenv").config("../../.env");

const JWT_SECRET = process.env.JWT_SECRET;
const formsRouter = express.Router();
formsRouter.use(express.json());

formsRouter
  .route("/getAll")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get(async (req, res, next) => {
    var forms;
    try {
      forms = await formsController.getForms();
    } catch (e) {
      logger.error(e);
      return res.json({
        success: false,
        msg: "Error",
      });
    }

    await forms.forEach((form) => {
      form.data = form.data.toString("base64");
    });

    return res.json({
      success: true,
      forms: forms,
    });
  });

formsRouter
  .route("/create")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .post(async (req, res, next) => {
    const id = req.body.id;
    const data = req.files.form.data;
    const name = req.body.name;

    if (req.body.office_token) {
      var token = req.body.office_token;
      jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
          return res.json({
            success: false,
            msg: "Error",
          });
        }
        req.user = user;
      });
    } else {
      return res.json({
        success: false,
        msg: "Error",
      });
    }

    try {
      await formsController.createForm(id, data, name);
    } catch (e) {
      logger.error(e);
      return res.json({
        success: false,
        msg: "Error",
      });
    }
    return res.json({
      success: true,
      msg: "Form created successfully",
    });
  });

module.exports = formsRouter;
