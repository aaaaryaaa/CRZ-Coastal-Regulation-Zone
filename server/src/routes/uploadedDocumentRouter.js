const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Blob } = require("buffer");
const saltRounds = 10;
require("dotenv").config("../../.env");

const JWT_SECRET = process.env.JWT_SECRET;
const uploadedDocumentController = require("../controllers/uploadedDocumentController");
const uploadedDocumentRouter = express.Router();
const db = require("../models/index");
uploadedDocumentRouter
  .route("/upload")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .post(async (req, res, next) => {
    const { applicationId } = req.body;
    const files = req.files;
    if (!files || !applicationId) {
      return res.json({
        success: false,
        msg: "Wrong input",
      });
    }

    if (req.cookies && req.cookies.login_token) {
      var token = req.cookies.login_token;
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

    const keys = Object.keys(req.files);
    const values = Object.values(req.files);

    try {
      keys.forEach(async (key, index) => {
        await uploadedDocumentController.createUploadedDocument(
          key,
          applicationId,
          values[index].data,
          values[index].name.toLowerCase()
        );
      });

      await db.Application.update(
        {
          updated_on: Date.now(),
          status: "ready",
        },
        {
          where: {
            id: applicationId,
          },
        }
      );
    } catch (e) {
      logger.error(e);
      return res.json({
        success: false,
        msg: "Error",
      });
    }

    return res.json({
      success: true,
      msg: "Documents Uploaded",
    });
  });

uploadedDocumentRouter
  .route("/setDocs")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .post(async (req, res, next) => {
    const { applicationId, documents } = req.body;
    if (!applicationId || !documents) {
      return res.json({
        success: false,
        msg: "Wrong input",
      });
    }

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

    try {
      await documents.forEach(async (doc) => {
        await uploadedDocumentController.createUploadedDocument(
          doc,
          applicationId,
          null,
          null
        );
      });

      await db.Application.update(
        {
          updated_on: Date.now(),
          status: "seen",
        },
        {
          where: {
            id: applicationId,
          },
        }
      );
    } catch (e) {
      logger.error(e);
      return res.json({
        success: false,
        msg: "Wrong input",
      });
    }
    return res.json({
      success: true,
      msg: "Documents Added",
    });
  });

uploadedDocumentRouter
  .route("/pendingDocs")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .post(async (req, res, next) => {
    const { applicationId } = req.body;

    if (!applicationId) {
      return res.json({
        success: false,
        msg: "Wrong input",
      });
    }

    if (req.cookies && req.cookies.login_token) {
      var token = req.cookies.login_token;
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
      var uploadDocuments = await uploadedDocumentController.getAllUploadedDocs(
        applicationId
      );
    } catch (e) {
      logger.error(e);
      return res.json({
        success: false,
        msg: "Error",
      });
    }

    var docs = [];
    uploadDocuments.forEach((doc) => {
      if (doc.data === null) {
        docs.push(doc);
      }
    });
    return res.json({
      success: true,
      docs: docs,
    });
  });

module.exports = uploadedDocumentRouter;
