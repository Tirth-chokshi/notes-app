require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const {
  findNoteById,
  changeNoteById,
  createNote,
  deleteNoteById,
  displayAllNotes,
} = require("./controllers/notesController.js");
const connectToDatabase = require("./config/connectToDatabase.js");
const {
  handleSignup,
  handleLogin,
  checkAuth,
  handleLogout,
} = require("./controllers/userController.js");
const requireAuth = require("./middleware/requireAuth.js");

const cors = require("cors");

connectToDatabase();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

app.post("/signup", handleSignup);
app.post("/login", handleLogin);
app.get("/checkAuth", requireAuth, checkAuth);
app.get("/logout", handleLogout);

app.get("/notes", requireAuth, displayAllNotes);
app.get("/", (req, res) => {
  console.log(req.cookies);
});
app.get("/notes/:id", requireAuth, findNoteById);
app.put("/notes/:id", requireAuth, changeNoteById);
app.post("/notes", requireAuth, createNote);
app.delete("/notes/:id", requireAuth, deleteNoteById);

app.listen(process.env.PORT, () => {
  console.log(`server running on ${process.env.PORT}`);
});
