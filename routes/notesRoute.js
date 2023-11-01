const noteRoute = require("express").Router();
// const { v4: uuidv4 } = require("uuid");

const { read_File } = require("../utils/fsUtils");

noteRoute.get("/", (req, res) => {
  console.info(`${req.method} request accepted for note`);

  read_File("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

module.exports = noteRoute;
