import React from "react";
import LoginForm from "../components/LoginForm";
import authStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {
  const store = authStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (store.loggedIn === true) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex justify-center mt-24">
      <div className="flex flex-col justify-center align-center text-center bg-white text-xl p-4 rounded-2xl shadow-2xl">
        <div className="text-4xl p-8">Login Form</div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
