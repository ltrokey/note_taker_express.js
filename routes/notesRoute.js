const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");

const { read_File, read_Append, write_File } = require("../utils/fsUtils");

// GET route to retrieve all notes
router.get("/notes", (req, res) => {
  console.info(`${req.method} request accepted for note`);

  read_File("./db/db.json", "utf8")
    .then((data) => res.json(JSON.parse(data)))
    .catch((error) => res.status(500).json({ error: error.message }));
});

// POST route to create a new note
router.post("/notes", (req, res) => {
  console.info(`${req.method} request received to submit notes`);

  const { title, text } = req.body;

  // Check if title and text are provided in the request
  if (!title || !text) {
    return res
      .status(400)
      .json({ error: "Title and text are required for a note." });
  }

  // Create a new note object with a unique ID
  const newNote = {
    title,
    text,
    id: uuidv4(),
  };

  read_Append(newNote, "./db/db.json")
    .then(() => res.json({ status: "success", body: newNote }))
    .catch((error) =>
      res.status(500).json({ error: "Error in appending note." })
    );
});

// DELETE route to delete a note by ID
router.delete("/notes/:id", (req, res) => {
  const noteId = req.params.id;

  read_File("./db/db.json", "utf8")
    .then((data) => {
      const parsedData = JSON.parse(data);
      const noteIndex = parsedData.findIndex((note) => note.id === noteId);
      if (noteIndex !== -1) {
        // Remove the note from the array
        parsedData.splice(noteIndex, 1);

        // Write the updated data back to the file
        return write_File("./db/db.json", JSON.stringify(parsedData, null, 4));
      } else {
        // Note not found, return a 404 status
        return Promise.reject(new Error("Note not found"));
      }
    })
    .then(() => res.status(204).send()) // Successfully deleted, return 204 No Content
    .catch((error) => {
      if (error.message === "Note not found") {
        return res.status(404).json({ error: error.message });
      } else {
        return res.status(500).json({ error: error.message });
      }
    });
});

module.exports = router;
