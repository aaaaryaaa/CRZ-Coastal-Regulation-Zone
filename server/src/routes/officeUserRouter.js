const express = require("express");
const officeUserController = require("../controllers/officeUserController");
const officeUserRouter = express.Router();
officeUserRouter.use(express.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
require("dotenv").config("../../.env");

const JWT_SECRET = process.env.JWT_SECRET;
const db = require("../models/index");
const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

// officeUserRouter
//   .route("/create")
//   .all((req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "text/plain");
//     next();
//   })
//   .post(async (req, res, next) => {
//     const { email, password } = req.body;
//     bcrypt.hash(password, saltRounds, async function (err, hash) {
//       if (err === null || err === undefined) {
//         officeUserController.createOfficeUser(email, hash);
//       } else {
//         return res.json({
//           success: false,
//           msg: "Error",
//         });
//       }
//     });
//   });

officeUserRouter
  .route("/login")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .post(async (req, res, next) => {
    const { email, password } = req.body;
    if (!emailRegex.test(email) || !password || password.length < 8) {
      return res.json({
        success: false,
        msg: "Enter correct email and password",
      });
    }
    var officeUser;

    try {
      officeUser = await officeUserController.findOfficeUser(email);
    } catch (e) {
      logger.error(e);
      return res.json({
        success: false,
        msg: "Error",
      });
    }

    if (officeUser === null) {
      return res.json({
        success: false,
        msg: "User not found",
      });
    }


    bcrypt.hash("Office@123", saltRounds, async function (err, hash) {
            if (err === null || err === undefined) {
              console.log("hash: "+ hash)
            } else {
              return res.json({
                success: false,
                msg: "Error",
              });
            }
          });

    
    bcrypt.compare(password, officeUser.password, async function (err, result) {
      if (result === true) {
        const accessToken = jwt.sign(officeUser.email, JWT_SECRET);
        try {
          await db.OfficeUser.update(
            {
              last_logged_in: Date.now(),
            },
            {
              where: {
                email: email,
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
        return res
          .cookie("office_token", accessToken, {
            httpOnly: true,
            domain: process.env.DOMAIN,
            secure: process.env.NODE_ENV === "development" ? false : true,
            sameSite: "strict",
            expires: new Date(Date.now() + 7200000),
          })
          .json({
            success: true,
            msg: "Successfully logged in",
          });
      } else {
        return res.status(200).json({
          success: false,
          msg: "Invalid Password or Email",
        });
      }
    });
  });

officeUserRouter
  .route("/verify")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get(async (req, res, next) => {
    if (req.cookies && req.cookies.office_token) {
      var token = req.cookies.office_token;
      jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err)
          return res.json({
            success: false,
            msg: "Error",
          });
        req.user = user;
        return res.json({ success: true, email: user });
      });
    } else {
      return res.json({
        success: false,
        msg: "Error",
      });
    }
  });

officeUserRouter
  .route("/logout")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get(async (req, res, next) => {
    return res
      .cookie("office_token", "", {
        httpOnly: true,
        domain: process.env.DOMAIN,
        secure: process.env.NODE_ENV === "development" ? false : true,
        sameSite: "strict",
        expires: new Date(Date.now() + 7200000),
      })
      .json({
        success: true,
        msg: "Successfully logged out",
      });
  });

officeUserRouter
  .route("/stats")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .post(async (req, res, next) => {
    var { start_date, end_date } = req.body;

    var a1 = await db.sequelize.query(
      `SELECT DISTINCT id FROM Applications WHERE DATE(updated_on)>="${start_date}" AND DATE(updated_on)<="${end_date}" AND type="Residential Conversion" AND status="pending";`
    );

    const new1 = a1[0].length;
    var a2 = await db.sequelize.query(
      `SELECT DISTINCT id FROM Applications WHERE DATE(updated_on)>="${start_date}" AND DATE(updated_on)<="${end_date}" AND type="Residential Conversion" AND status="seen";`
    );

    const seen1 = a2[0].length;
    var a3 = await db.sequelize.query(
      `SELECT DISTINCT id FROM Applications WHERE DATE(updated_on)>="${start_date}" AND DATE(updated_on)<="${end_date}" AND type="Residential Conversion" AND status="ready";`
    );
    const pending1 = a3[0].length;

    var a4 = await db.sequelize.query(
      `SELECT DISTINCT id FROM Applications WHERE DATE(updated_on)>="${start_date}" AND DATE(updated_on)<="${end_date}" AND type="Residential Conversion" AND status="approved";`
    );
    const cleared1 = a4[0].length;

    var b1 = await db.sequelize.query(
      `SELECT DISTINCT id FROM Applications WHERE DATE(updated_on)>="${start_date}" AND DATE(updated_on)<="${end_date}" AND type="Commercial Conversion" AND status="pending";`
    );
    const new2 = b1[0].length;
    var b2 = await db.sequelize.query(
      `SELECT DISTINCT id FROM Applications WHERE DATE(updated_on)>="${start_date}" AND DATE(updated_on)<="${end_date}" AND type="Commercial Conversion" AND status="seen";`
    );
    const seen2 = b2[0].length;
    var b3 = await db.sequelize.query(
      `SELECT DISTINCT id FROM Applications WHERE DATE(updated_on)>="${start_date}" AND DATE(updated_on)<="${end_date}" AND type="Commercial Conversion" AND status="ready";`
    );
    const pending2 = b3[0].length;

    var b4 = await db.sequelize.query(
      `SELECT DISTINCT id FROM Applications WHERE DATE(updated_on)>="${start_date}" AND DATE(updated_on)<="${end_date}" AND type="Commercial Conversion" AND status="approved";`
    );
    const cleared2 = b4[0].length;

    var c1 = await db.sequelize.query(
      `SELECT DISTINCT id FROM Applications WHERE DATE(updated_on)>="${start_date}" AND DATE(updated_on)<="${end_date}" AND type="Residential Construction" AND status="pending";`
    );
    const new3 = c1[0].length;
    var c2 = await db.sequelize.query(
      `SELECT DISTINCT id FROM Applications WHERE DATE(updated_on)>="${start_date}" AND DATE(updated_on)<="${end_date}" AND type="Residential Construction" AND status="seen";`
    );
    const seen3 = c2[0].length;
    var c3 = await db.sequelize.query(
      `SELECT DISTINCT id FROM Applications WHERE DATE(updated_on)>="${start_date}" AND DATE(updated_on)<="${end_date}" AND type="Residential Construction" AND status="ready";`
    );
    const pending3 = c3[0].length;

    var c4 = await db.sequelize.query(
      `SELECT DISTINCT id FROM Applications WHERE DATE(updated_on)>="${start_date}" AND DATE(updated_on)<="${end_date}" AND type="Residential Construction" AND status="approved";`
    );
    const cleared3 = c4[0].length;

    var d1 = await db.sequelize.query(
      `SELECT DISTINCT id FROM Applications WHERE DATE(updated_on)>="${start_date}" AND DATE(updated_on)<="${end_date}" AND type="Commercial/Govt. Projects" AND status="pending";`
    );
    const new4 = d1[0].length;
    var d2 = await db.sequelize.query(
      `SELECT DISTINCT id FROM Applications WHERE DATE(updated_on)>="${start_date}" AND DATE(updated_on)<="${end_date}" AND type="Commercial/Govt. Projects" AND status="seen";`
    );
    const seen4 = d2[0].length;
    var d3 = await db.sequelize.query(
      `SELECT DISTINCT id FROM Applications WHERE DATE(updated_on)>="${start_date}" AND DATE(updated_on)<="${end_date}" AND type="Commercial/Govt. Projects" AND status="ready";`
    );
    const pending4 = d3[0].length;

    var d4 = await db.sequelize.query(
      `SELECT DISTINCT id FROM Applications WHERE DATE(updated_on)>="${start_date}" AND DATE(updated_on)<="${end_date}" AND type="Commercial/Govt. Projects" AND status="approved";`
    );
    const cleared4 = d4[0].length;
    return res.json({
      success: true,
      new1: new1,
      seen1: seen1,
      pending1: pending1,
      cleared1: cleared1,

      new2: new2,
      seen2: seen2,
      pending2: pending2,
      cleared2: cleared2,

      new3: new3,
      seen3: seen3,
      pending3: pending3,
      cleared3: cleared3,

      new4: new4,
      seen4: seen4,
      pending4: pending4,
      cleared4: cleared4,
    });
  });

module.exports = officeUserRouter;