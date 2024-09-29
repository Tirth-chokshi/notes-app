import Notes from "../components/Notes";
import UpdateNoteForm from "../components/UpdateNoteForm";
import CreateNoteForm from "../components/CreateNoteForm";
import notesStore from "../stores/notesStore";
import { useEffect } from "react";
import authStore from "../stores/authStore";

const NotesPage = () => {
  const authstore = authStore();
  const store = notesStore();

  useEffect(() => {
    async function fetchData() {
      console.log(authstore.loginCookie);
      await store.fetchNotes(authstore.loginCookie);
      await store.updateCookie(authstore.loginCookie);
    }
    console.log(authstore.loginCookie);
    fetchData();
  }, []);
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <UpdateNoteForm />
        <CreateNoteForm />
        <Notes />
      </div>
    </div>
  );
};

export default NotesPage;
