import { useEffect } from "react";
import authStore from "../stores/authStore";
import { useCookies } from "react-cookie";
import notesStore from "../stores/notesStore";

const LogoutPage = () => {
  const store = authStore();
  const noteStore = notesStore();
  const [_, setCookie, removeCookie] = useCookies(["Auth"]);

  useEffect(() => {
    store.logout();
    removeCookie("Auth", { path: "/" });
  }, []);
  return <div>You are now logged out</div>;
};

export default LogoutPage;
