import notesStore from "../stores/notesStore";

const CreateNoteForm = () => {
  const store = notesStore();
  if (store.updateForm._id) return <></>;

  return (
    <div className=" my-5 gap-2 shadow-2xl flex flex-col border-2 border-black rounded-2xl p-1 w-4/5 md:w-1/5 break-words">
      <h3 className="text-xl font-bold pt-3 px-3">Create Note</h3>
      <form onSubmit={store.createNote} className="flex flex-col p-3 gap-2">
        <input
          className="  border-2 border-black p-2 rounded-md "
          onChange={store.updateCreateFormField}
          value={store.createForm.title}
          name="title"
          placeholder="Title"
        />
        <textarea
          className="border-2 border-black resize-none p-2 mt-2 rounded-md "
          onChange={store.updateCreateFormField}
          value={store.createForm.body}
          name="body"
          placeholder="Note"
        />
        <button
          type="submit"
          className="bg-black text-white rounded-3xl p-2 px-4 mt-2 self-end"
        >
          Create Note
        </button>
      </form>
    </div>
  );
};

export default CreateNoteForm;
