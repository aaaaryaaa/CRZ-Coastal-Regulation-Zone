const express = require("express");
let app = express();

require("dotenv").config();
const PORT = process.env.PORT || 5000;
const path = require("path");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const router = express.Router();
const rootPath = path.resolve("./dist");
const sequelize = require("./src/database/connection");
const server = require("http").createServer(app);
const cors = require("cors");
const winston = require("winston");
const cookieParser = require("cookie-parser");
const upload = require("express-fileupload");
const myLooger = require("./middleware/myLogger");
global.logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

const myRate = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
var helmet = require("helmet");

// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       scriptSrcAttr: null,
//       imgSrc: ["'self'", "*"],
//       upgradeInsecureRequests: null,
//     },
//   })
// );
app.set("view engine", "pug");
app.set("views", path.resolve("./src/views"));
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(upload());
app.use(myLooger);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use(express.static(rootPath));
app.use(
  cors({
    credentials: true,
    origin: process.env.NODE_ENV === "development" ? false : true,
    methods: ["GET", "POST"],
  })
);
app.options("*", cors());

app.use("/api", myRate);

//testing route
app.get("/api/test", (req, res) => {
  res.status(200).json({
    msg: "Server is running",
  });
});

//user authentication route
const authRouter = require("./src/routes/authRouter");

app.use("/api/auth", authRouter);

//application route
const applicationRouter = require("./src/routes/applicationRouter");
app.use("/api/application", applicationRouter);

//form route
const formsRouter = require("./src/routes/formsRouter");
app.use("/api/forms", formsRouter);

//document route
const documentRouter = require("./src/routes/documentRouter");
app.use("/api/documents", documentRouter);

//upload document route
const uploadedDocumentRouter = require("./src/routes/uploadedDocumentRouter");
app.use("/api/uploadDocuments", uploadedDocumentRouter);

//office user route
const officeUserRouter = require("./src/routes/officeUserRouter");
app.use("/api/officeUser", officeUserRouter);

//client side
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

server.listen(PORT, "0.0.0.0", () => {
  logger.info(`Server up at port ${PORT}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.error("Server closed");
    });
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error("Unexpected Error " + error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
