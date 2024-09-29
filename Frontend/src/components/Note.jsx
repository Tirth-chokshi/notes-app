import React from "react";
import notesStore from "../stores/notesStore";
import Draggable from "react-draggable";

const Note = ({ note }) => {
  const store = notesStore((store) => {
    return { toggleNote: store.toggleNote, deleteNote: store.deleteNote };
  });

  return (
    <div className=" hover:scale-110 transition duration-300 shadow-2xl flex flex-col border-2 border-black rounded-2xl p-1 w-4/5 md:w-1/5  break-words flex-between h-full">
      <h3 className="text-xl font-bold pt-3 px-3">{note.title}</h3>
      <p className="pt-3 px-3">{note.body}</p>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => store.deleteNote(note._id)}
          className=" bg-black text-white rounded-3xl p-1 px-2"
        >
          Delete
        </button>
        <button
          onClick={() => store.toggleNote(note)}
          className="text-gray-600  font-bold rounded-2xl p-1.5"
        >
          Update Note
        </button>
      </div>
    </div>
  );
};

export default Note;
