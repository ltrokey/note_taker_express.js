const noteRoute = require("express").Router();
const { v4: uuidv4 } = require("uuid");

const { read_File, read_Append } = require("../utils/fsUtils");

noteRoute.get("/", (req, res) => {
  console.info(`${req.method} request accepted for note`);

  read_File("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

noteRoute.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to submit notes`);
  const { title, text } = req.body;

  if (title && text) {
      const newNote = {
          title,
          text,
          id: uuidv4(),
      };

      read_Append(newNote, './db/db.json')
        .then(() => res.json({
          status: 'success',
          body: newNote,
        }))
        .catch((error) => res.status(500).json({ error: 'Error in appending note.' }));
  } else {
      res.status(400).json({ error: 'Title and text are required for a note.' });
  }
});


module.exports = noteRoute;
