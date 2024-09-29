import LoginPage from "../pages/LoginPage";
import NotesPage from "../pages/NotesPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import SignupPage from "../pages/SignupPage";
import LogoutPage from "../pages/LogoutPage";
import authStore from "../stores/authStore";

function App() {
  const store = authStore();
  return (
    <div>
      <BrowserRouter>
        <ul>
          {store.loggedIn == false && (
            <li className="absolute text-2xl md:text-3xl top-2 md:top-4 left-2  p-2 rounded-2xl tracking-wide font-medium">
              <Link to="/login">Login</Link>
            </li>
          )}
          <li>
            <h1 className="text-4xl md:text-6xl text-center pt-3">
              <span className="rounded-xl p-2 font-bold tracking-widest ">
                NOTES
              </span>
            </h1>
          </li>

          {store.loggedIn == false && (
            <li className="absolute text-2xl md:text-3xl top-2 md:top-4 right-2 p-2 rounded-2xl tracking-wide font-medium">
              <Link to="/signup">Signup</Link>
            </li>
          )}
          {store.loggedIn == true && (
            <li className="absolute text-xs md:text-xl top-4 right-1 md:top-5 bg-black text-white p-1.5 md:p-2 rounded-2xl tracking-wide shadow-2xl font-medium">
              <Link to="/logout">Logout</Link>
            </li>
          )}
        </ul>

        <hr className=" my-3 border-2 border-black dark:border-black" />

        <Routes>
          <Route
            index
            element={
              <RequireAuth>
                <NotesPage />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
