const express = require("express");
const userController = require("../controllers/userController");
const authRouter = express.Router();
authRouter.use(express.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
require("dotenv").config("../../.env");
const JWT_SECRET = process.env.JWT_SECRET;
const db = require("../models/index");
const phoneRegex =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

authRouter
  .route("/getOtp")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .post(async (req, res, next) => {
    const phone = req.body.phone;

    if (!phoneRegex.test(phone)) {
      return res.json({
        success: false,
        msg: "Enter correct phone number",
      });
    }
    var user;
    try {
      user = await userController.checkUser(phone);
      if (user === null) {
        user = await userController.createUser(phone);
      }
    } catch (e) {
      logger.error(e);
      return res.json({
        success: false,
        msg: "Error",
      });
    }

    var otp = "123456";
    bcrypt.hash(otp, saltRounds, async function (err, hash) {
      if (err === null || err === undefined) {
        try {
          await db.User.update(
            {
              otp: hash,
              otp_timestamp: Date.now(),
            },
            {
              where: {
                phone: phone,
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
        logger.info(`OTP generated for ${phone}`);
        return res.json({
          success: true,
          msg: "OTP Generated successfully!!!",
        });
      } else {
        return res.json({
          success: false,
          msg: "Error",
        });
      }
    });
  });

authRouter
  .route("/login")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .post(async (req, res, next) => {
    const phone = req.body.phone;
    const otp = req.body.otp;
    if (!phoneRegex.test(phone) || otp.length === 0) {
      return res.json({
        success: false,
        msg: "Enter correct phone number and otp",
      });
    }
    var user;
    try {
      user = await userController.checkUser(phone);
    } catch (e) {
      logger.error(e);
      return res.json({
        success: false,
        msg: "Error",
      });
    }
    if (user === null) {
      return res.json({
        success: false,
        msg: "User not found",
      });
    }
    bcrypt.compare(otp, user.otp, async function (err, result) {
      if (
        result === true &&
        new Date().getTime() - user.otp_timestamp.getTime() < 240000
      ) {
        const accessToken = jwt.sign(phone, JWT_SECRET);
        try {
          await db.User.update(
            {
              last_logged_in: Date.now(),
            },
            {
              where: {
                phone: phone,
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
          .cookie("login_token", accessToken, {
            httpOnly: true,
            domain: process.env.DOMAIN,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "development" ? false : true,
            expires: new Date(Date.now() + 7200000),
          })
          .json({
            success: true,
            msg: "successfully logged in",
          });
      } else {
        return res.status(200).json({
          success: false,
          msg: "Invalid OTP",
        });
      }
    });
  });

authRouter
  .route("/verify")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get(async (req, res, next) => {
    if (req.cookies && req.cookies.login_token) {
      var token = req.cookies.login_token;
      jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err)
          return res.json({
            success: false,
            msg: "Error",
          });
        req.user = user;
        return res.json({ success: true, phone: user });
      });
    } else {
      return res.json({
        success: false,
        msg: "Error",
      });
    }
  });

authRouter
  .route("/logout")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get(async (req, res, next) => {
    return res
      .cookie("login_token", "", {
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

module.exports = authRouter;
