import notesStore from "../stores/notesStore";

const updateNoteForm = () => {
  const store = notesStore();
  if (!store.updateForm._id) return <></>;

  return (
    <div className="my-5 gap-2 shadow-2xl flex flex-col border-2 border-black rounded-2xl p-1 w-4/5 md:w-1/5 break-words">
      <h3 className="text-xl font-bold pt-3 px-3">Update Note</h3>
      <form onSubmit={store.updateNote} className=" flex flex-col p-3 gap-2">
        <input
          className=" border-2 border-black p-2 rounded-md focus:outline-none focus:border-blue-500 "
          onChange={store.updateFieldChange}
          value={store.updateForm.title}
          name="title"
          placeholder="Title"
        />
        <textarea
          className="border-2 border-black resize-none p-2 mt-2 rounded-md focus:outline-none focus:border-blue-500"
          onChange={store.updateFieldChange}
          value={store.updateForm.body}
          name="body"
          placeholder="Note"
        />
        <button
          type="submit"
          className="bg-black text-white rounded-3xl p-2 px-4 mt-2 self-end"
        >
          Update Note
        </button>
      </form>
    </div>
  );
};

export default updateNoteForm;
