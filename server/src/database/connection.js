const Sequelize = require("sequelize");
const mysql = require("mysql2/promise");
const config = require("../../config/config.js");

const initialize = async () => {
  const { host, port, username, password, database } = config;
  const connection = await mysql.createConnection({
    host: host,
    port: port,
    user: username,
    password: password,
  });
  await connection
    .query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`)
    .then(async () => {
      logger.info("Database created.");
      await connection.query(` USE \`${database}\`;`).then(async () => {
        logger.info("Using database");
        await connection
          .query(
            `CREATE TABLE IF NOT EXISTS OfficeUsers (email VARCHAR(255) NOT NULL , password VARCHAR(255) NOT NULL, last_logged_in DATETIME, PRIMARY KEY (email)) ENGINE=InnoDB;`
          )
          .then(async () => {
            await connection
              .query(
                `INSERT INTO officeusers (email, password) select 'office@gmail.com','$2b$10$dPKHjtqjw69LvJaiHuadKecpt4NAxU15JFuyfbsCAnaKcT8uqIGyK' where (select count('email') from officeusers) = 0;`
              )
              .then(() => {
                logger.info("everything created");
              });
          });
      });
    });
};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    define: {
      timestamps: false,
    },
  }
);

initialize().then(() => {
  sequelize
    .authenticate()
    .then(() => {
      logger.info("Database connected");
    })
    .catch((err) => {
      logger.error("Connection Error: " + err);
    });
});

module.exports = sequelize;
