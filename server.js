const express = require("express");
const fs = require("fs");
const notes = require("./db/db.json");
const path = require("path");
const uuid = require("uuid");

// set up server
const app = express();
var PORT = process.env.PORT || 3001;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// GET route requests
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

// post request
app.post("/api/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  const newNotes = req.body;
  newNotes.id = uuid.v4();
  notes.push(newNotes);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.json(notes);
});

// delete request
app.delete("/api/notes/:id", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  const delNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
  fs.writeFileSync("./db/db.json", JSON.stringify(delNote));
  res.json(delNote);
});

// html calls
// calls home
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// call notes.html
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//start listening
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
