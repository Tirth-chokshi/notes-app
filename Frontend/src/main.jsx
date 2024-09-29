import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import axios from "axios";
import "./index.css";

axios.defaults.baseURL = "https://mern-notes-app-2k2f.onrender.com";
axios.defaults.withCredentials = true;

// https://mern-notes-app-2k2f.onrender.com
// http://localhost:3000

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
