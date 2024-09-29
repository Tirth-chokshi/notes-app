import { useEffect } from "react";
import authStore from "../stores/authStore";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const RequireAuth = (props) => {
  const store = authStore();
  const [getCookie] = useCookies(["Auth"]);

  useEffect(() => {
    if (store.loggedIn === null) {
      console.log(getCookie);
      store.loginCookie = getCookie.Auth;
      store.checkAuth();
    }
  }, []);

  if (store.loggedIn === null) {
    return (
      <div>
        .... Please wait , the backend is hosted on render's , which goes to
        sleep often ...
      </div>
    );
  }
  if (store.loggedIn === false) return <Navigate to="/login" />;

  return <div>{props.children}</div>;
};

export default RequireAuth;
