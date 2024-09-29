import { create } from "zustand";
import axios from "axios";

const authStore = create((set) => ({
  loggedIn: null,
  loginCookie: null,
  loginForm: {
    email: "",
    password: "",
  },
  signupForm: {
    email: "",
    password: "",
  },
  updateLoginForm: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      loginForm: {
        ...state.loginForm,
        [name]: value,
      },
    }));
  },
  updateSignupForm: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      signupForm: {
        ...state.signupForm,
        [name]: value,
      },
    }));
  },
  login: async () => {
    const { loginForm } = authStore.getState();
    const res = await axios.post("/login", loginForm);

    return new Promise((resolve, reject) => {
      if (res.data.auth) {
        set((state) => ({
          loggedIn: true,
          loginCookie: res.data.auth, // Update loginCookie with the auth token
          loginForm: {
            email: "",
            password: "",
          },
        }));
        resolve(res.data.auth); // Resolve the Promise with the auth token
      } else {
        reject(new Error("Login failed. Invalid credentials or server error."));
      }
    });
  },
  signup: async () => {
    const { signupForm } = authStore.getState();
    const res = await axios.post("/signup", signupForm);
    set({
      signupForm: {
        email: "",
        password: "",
      },
    });
  },
  checkAuth: async () => {
    const { loginCookie, loggedIn } = authStore.getState();
    try {
      console.log("inside checkAuth frontend");
      console.log(loginCookie);
      await axios.get("/checkAuth", {
        headers: {
          authorization: loginCookie,
        },
      }),
        set({ loggedIn: true });
      console.log("loggedIn : ");
      console.log(loggedIn);
    } catch (error) {
      set({ loggedIn: false });
    }
  },
  logout: async () => {
    await axios.get("/logout");
    set({
      loggedIn: false,
      loginCookie: null,
      loginForm: {
        email: "",
        password: "",
      },
      signupForm: {
        email: "",
        password: "",
      },
    });
  },
}));

export default authStore;
