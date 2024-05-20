const express = require("express");
const applicationController = require("../controllers/applicationController");
const applicationRouter = express.Router();
applicationRouter.use(express.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Blob } = require("buffer");
const saltRounds = 10;
require("dotenv").config("../../.env");

const JWT_SECRET = process.env.JWT_SECRET;

const db = require("../models/index");

const phoneRegex =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

applicationRouter
  .route("/submit")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .post(async (req, res, next) => {
    if (req.cookies && req.cookies.login_token) {
      var token = req.cookies.login_token;
      jwt.verify(token, JWT_SECRET, async (err, user) => {
        if (err)
          return res.json({
            success: false,
            msg: "Error",
          });
        else {
          const {
            phone,
            name,
            email,
            address,
            surveyNo,
            village,
            taluk,
            type,
          } = req.body;
          var application;

          if (
            !phoneRegex.test(phone) ||
            !name ||
            !email ||
            !address ||
            !surveyNo ||
            !taluk ||
            !village ||
            !type ||
            !req.files ||
            !req.files.formOne ||
            !req.files.rtc ||
            !req.files.surveySketch ||
            !req.files.challan
          ) {
            res.json({
              success: false,
              msg: "Enter correct details",
            });
          }
          try {
            application = await applicationController.createApplication(
              phone,
              name,
              email,
              address,
              surveyNo,
              village,
              taluk,
              type,
              req.files.formOne.data,
              req.files.rtc.data,
              req.files.surveySketch.data,
              req.files.challan.data,
              req.files.formOne.name.toLowerCase().split(".").pop(),
              req.files.rtc.name.toLowerCase().split(".").pop(),
              req.files.surveySketch.name.toLowerCase().split(".").pop(),
              req.files.challan.name.toLowerCase().split(".").pop()
            );
            return res.json({
              success: true,
              applicationId: application.id,
            });
          } catch (e) {
            logger.error(e);
            return res.json({
              success: false,
              msg: "Error",
            });
          }
        }
      });
    } else {
      return res.json({
        success: false,
        msg: "Error",
      });
    }
  });

applicationRouter
  .route("/appStatus")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .post(async (req, res, next) => {
    if (req.cookies && req.cookies.login_token) {
      var token = req.cookies.login_token;
      jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err)
          return res.json({
            success: false,
            msg: "Error",
          });
      });
    } else {
      return res.json({
        success: false,
        msg: "Error",
      });
    }

    const { phone } = req.body;
    if (!phoneRegex.test(phone)) {
      return res.json({
        success: false,
        msg: "Enter correct phone number",
      });
    }
    try {
      var applications =
        await applicationController.findApplicationsWithoutDocuments(phone);
    } catch (e) {
      logger.error(e);
      return res.json({
        success: false,
        msg: "Error",
      });
    }

    var pendingApplications = [];
    var approvedApplications = [];
    var rejectedApplications = [];
    await applications.forEach((application) => {
      if (
        application.status === "pending" ||
        application.status === "seen" ||
        application.status === "ready"
      ) {
        pendingApplications.push(application);
      } else if (application.status === "approved") {
        approvedApplications.push(application);
      } else {
        rejectedApplications.push(application);
      }
    });

    return res.status(200).json({
      success: true,
      pendingApplication: pendingApplications,
      approvedApplication: approvedApplications,
      rejectedApplication: rejectedApplications,
    });
  });

applicationRouter
  .route("/appByType")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .post(async (req, res, next) => {
    const { type } = req.body;
    if (!type) {
      return res.json({
        success: false,
        msg: "Enter correct type",
      });
    }

    if (req.cookies && req.cookies.office_token) {
      var token = req.cookies.office_token;
      jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err)
          return res.json({
            success: false,
            msg: "Error",
          });
        req.user = user;
      });
    } else {
      return res.json({
        success: false,
        msg: "Error",
      });
    }

    try {
      const applications = await applicationController.findApplicationWithType(
        type
      );
      return res.json({
        success: true,
        applications: applications,
      });
    } catch (e) {
      return res.json({
        success: false,
        msg: "Enter correct type",
      });
    }
  });

applicationRouter
  .route("/appById")
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
        msg: "Error",
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
      const application = await applicationController.findApplicationWithId(
        applicationId
      );
      return res.json({
        success: true,
        application: application,
      });
    } catch (e) {
      logger.error(e);
      return res.json({
        success: false,
        msg: "Error",
      });
    }
  });

applicationRouter
  .route("/approveApplication")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .post(async (req, res, next) => {
    const { applicationId } = req.body;
    if (!applicationId || !req.files) {
      return res.json({
        success: false,
        msg: "Error something went wrong",
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

    const files = req.files;
    if (files.approval) {
      try {
        await applicationController.uploadApproval(
          files.approval.data,
          applicationId
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
        msg: "Application updated",
      });
    } else {
      return res.json({
        success: false,
        msg: "Error something went wrong",
      });
    }
  });

// applicationRouter
//   .route("/rejectApplication")
//   .all((req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "text/plain");
//     next();
//   })
//   .post(async (req, res, next) => {
//     const { applicationId } = req.body;
//     if (!applicationId || !req.files) {
//       return res.json({
//         success: false,
//         msg: "Error something went wrong",
//       });
//     }

//     if (req.cookies && req.cookies.office_token) {
//       var token = req.cookies.office_token;
//       jwt.verify(token, JWT_SECRET, (err, user) => {
//         if (err) {
//           return res.json({
//             success: false,
//             msg: "Error",
//           });
//         }
//         req.user = user;
//       });
//     } else {
//       return res.json({
//         success: false,
//         msg: "Error",
//       });
//     }

//     const files = req.files;
//     if (files.rejection) {
//       try {
//         await applicationController.uploadApproval(
//           files.rejection.data,
//           applicationId
//         );
//       } catch (e) {
//         logger.error(e);
//         return res.json({
//           success: false,
//           msg: "Error",
//         });
//       }
//       return res.json({
//         success: true,
//         msg: "Application updated",
//       });
//     } else {
//       return res.json({
//         success: false,
//         msg: "Error something went wrong",
//       });
//     }
//   });

applicationRouter
  .route("/rejectApplication")
  .post(async (req, res) => {
    try {
      const { applicationId, reason } = req.body;

      if (!applicationId || !reason) {
        return res.status(400).json({
          success: false,
          msg: "Invalid request, missing application ID or rejection reason",
        });
      }

      // Verify token

      await applicationController.uploadRejection(reason, applicationId);

      return res.status(200).json({
        success: true,
        msg: "Application rejected",
      });
    } catch (error) {
      console.error("Error rejecting application:", error);
      return res.status(500).json({
        success: false,
        msg: "Internal server error",
        error: error.message,
      });
    }
  });




module.exports = applicationRouter;

applicationRouter
  .route("/download")
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
        msg: "Error something went wrong",
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
    var data;
    try {
      data = await applicationController.download(applicationId);
    } catch (e) {
      logger.error(e);
      return res.json({
        success: false,
        msg: "Error",
      });
    }

    if (data === null) {
      return res.json({
        success: false,
        msg: "Error",
      });
    } else {
      return res.json({
        success: true,
        data: data.toString("base64"),
      });
    }
  });

module.exports = applicationRouter;
