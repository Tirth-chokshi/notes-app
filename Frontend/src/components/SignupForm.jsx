import authStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const store = authStore();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    await store.signup();

    navigate("/login");
  };

  return (
    <div className="w-full flex justify-center p-4">
      <form onSubmit={handleSignup} className="flex flex-col">
        <input
          onChange={store.updateSignupForm}
          value={store.signupForm.email}
          type="email"
          name="email"
          placeholder="Email"
          className="border-black border-2 w-full p-2 my-5 rounded-2xl"
        />

        <input
          onChange={store.updateSignupForm}
          value={store.signupForm.password}
          type="password"
          name="password"
          placeholder="Password"
          className="border-black border-2 w-full p-2 my-5 rounded-2xl mb-10"
        />

        <button
          type="submit"
          className="text-3xl mt-6 bg-black p-2 rounded-2xl"
        >
          <div className="text-white">Signup</div>
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
