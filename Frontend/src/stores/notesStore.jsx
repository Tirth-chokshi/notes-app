import { create } from "zustand";
import axios from "axios";

const notesStore = create((set) => ({
  notes: null,
  authCookie: null,
  createForm: {
    title: "",
    body: "",
  },
  updateForm: {
    _id: null,
    title: "",
    body: "",
  },
  updateCookie: (cookie) => {
    set({
      authCookie: cookie,
    });
  },
  fetchNotes: async (cookie) => {
    console.log(cookie);
    const res = await axios.get("/notes", {
      headers: {
        authorization: cookie,
      },
    });

    set({
      notes: res.data.note,
    });
  },

  updateCreateFormField: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        createForm: {
          ...state.createForm,
          [name]: value,
        },
      };
    });
  },

  createNote: async (e) => {
    e.preventDefault();
    const { notes, createForm, authCookie } = notesStore.getState();
    const res = await axios.post("/notes", createForm, {
      headers: {
        authorization: authCookie,
      },
    });

    set({
      notes: [...notes, res.data.note],
      createForm: {
        title: "",
        body: "",
      },
    });
  },

  deleteNote: async (_id) => {
    const { authCookie } = notesStore.getState();
    const res = await axios.delete(`/notes/${_id}`, {
      headers: {
        authorization: authCookie,
      },
    });
    const { notes } = notesStore.getState();

    const newNotes = [...notes].filter((note) => {
      return note._id !== _id;
    });

    set({
      notes: newNotes,
    });
  },
  toggleNote: async ({ _id, title, body }) => {
    set({
      updateForm: {
        _id,
        title,
        body,
      },
    });
  },
  updateFieldChange: (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    set((state) => {
      return { updateForm: { ...state.updateForm, [name]: value } };
    });
  },

  updateNote: async (e) => {
    e.preventDefault();
    const {
      notes,
      updateForm: { title, body, _id },
      authCookie,
    } = notesStore.getState();

    const res = await axios.put(
      `/notes/${_id}`,
      {
        title,
        body,
      },
      {
        headers: {
          authorization: authCookie,
        },
      }
    );

    const newNotes = [...notes];
    const noteIndex = notes.findIndex((note) => {
      return note._id === _id;
    });
    newNotes[noteIndex] = res.data.note;

    set({
      notes: newNotes,
      updateForm: {
        _id: null,
        title: "",
        body: "",
      },
    });
  },
}));

export default notesStore;
