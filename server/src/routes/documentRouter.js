const express = require("express");
const documentController = require("../controllers/documentController");
const documentRouter = express.Router();
documentRouter.use(express.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
require("dotenv").config("../../.env");

const JWT_SECRET = process.env.JWT_SECRET;

documentRouter
  .route("/createDoc")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .post(async (req, res, next) => {
    const { id, name, description } = req.body;
    if (!id || !name || !description) {
      return res.json({
        success: false,
        msg: "Enter correct phone number",
      });
    }

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
      await documentController.createDocument(id, name, description);
    } catch (e) {
      logger.error(e);
      return res.json({
        success: false,
        msg: "Error",
      });
    }
    return res.json({
      success: true,
      msg: "Document created ",
    });
  });

documentRouter
  .route("/getAll")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get(async (req, res, next) => {
    if (req.cookies && req.cookies.office_token) {
      var token = req.cookies.office_token;
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

    var documents;

    try {
      documents = await documentController.getAllDocuments();
    } catch (e) {
      logger.error(e);
      return res.json({
        success: false,
        msg: "Error",
      });
    }

    return res.json({
      success: true,
      documents: documents,
    });
  });

module.exports = documentRouter;
