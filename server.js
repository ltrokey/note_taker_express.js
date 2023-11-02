const express = require("express");
const path = require("path");
const fsUtils = require("./utils/fsUtils");
const api = require("./routes/notesRoute");
const notes = require("./db/db.json")

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/api", api);

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/pages/notes.html"))
);

app.listen(PORT, () => {
  console.log(`Serving static asset routes at http://localhost:${PORT}`);
});
