const Note = require("../models/Note.js");

async function displayAllNotes(req, res) {
  try {
    const note = await Note.find({ user: req.user._id });
    console.log("notes called");
    res.json({
      note,
    });
  } catch (err) {
    console.log("error in display all notes");
    res.sendStatus(400);
  }
}

const findNoteById = async (req, res) => {
  try {
    const id = req.params.id;

    const note = await Note.findOne({ _id: id, user: req.user._id });

    res.json({
      note,
    });
  } catch (err) {
    res.sendStatus(400);
  }
};

const changeNoteById = async (req, res) => {
  try {
    const { title, body } = req.body;
    const id = req.params.id;

    await Note.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { title, body }
    );

    const note = await Note.findById(id);

    res.json({ note });
  } catch (err) {
    res.sendStatus(400);
  }
};

const createNote = async (req, res) => {
  try {
    const { title, body } = req.body;

    const note = await Note.create({ title, body, user: req.user._id });

    res.json({
      note,
    });
  } catch (err) {
    res.sendStatus(400);
  }
};

const deleteNoteById = async (req, res) => {
  try {
    const id = req.params.id;

    const note = await Note.deleteOne({ _id: id, user: req.user._id });

    res.json({
      note,
    });
  } catch (err) {
    res.sendStatus(400);
  }
};

module.exports = {
  displayAllNotes,
  createNote,
  findNoteById,
  changeNoteById,
  deleteNoteById,
};
