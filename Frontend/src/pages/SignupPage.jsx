import SignupForm from "../components/SignupForm";

const SignupPage = () => {
  return (
    <div className="flex justify-center mt-24">
      <div className="flex flex-col justify-center align-center text-center bg-white text-xl p-4 rounded-2xl shadow-2xl">
        <div className="text-4xl p-8">SIgnup Form</div>
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
