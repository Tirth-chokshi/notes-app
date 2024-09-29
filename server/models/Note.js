const mongoose = require("mongoose");

const noteScehma = new mongoose.Schema({
  title: String,
  body: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Note = mongoose.model("Note", noteScehma);

module.exports = Note;
