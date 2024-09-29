import notesStore from "../stores/notesStore";
import Note from "./Note";

const Notes = () => {
  const store = notesStore();

  return (
    <div className="flex flex-col w-full ">
      <h1 className="text-3xl mx-2 my-6"> Your Notes</h1>
      <div className="flex flex-wrap justify-center md:justify-start items-start md:ml-20 gap-16">
        {store.notes &&
          store.notes
            .slice()
            .reverse()
            .map((note) => {
              return <Note note={note} key={note._id} />;
            })}
      </div>
    </div>
  );
};

export default Notes;
