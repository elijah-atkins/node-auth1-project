const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const restricted = require('../middleware/restricted');
const notfound = require('../middleware/404');


const usersRouter = require("../users/users-router.js");
const authRouter = require("../auth/auth-router")

const server = express();

const sessionConfig = {
    name: 'sksession',
    secret: 'myspeshulsecret',
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false, // should be true in production
      httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
  
    store: new knexSessionStore(
      {
        knex: require("../database/configDB.js"),
        tablename: "sessions",
        sidfieldname: "sid",
        createtable: true,
        clearInterval: 1000 * 60 * 60
      }
    )
  }


server.use(helmet());
server.use(express.json());
server.use(cors());

server.use(session(sessionConfig));
server.use("/api/users", restricted, usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});
server.use(notfound)

module.exports = server;
