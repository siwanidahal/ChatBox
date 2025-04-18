import { Link, useNavigate } from "react-router";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import useCheckAuth from "../hooks/useCheckToken";

const Signup = () => {
  const navigate = useNavigate();
  useCheckAuth()
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
    const data = new FormData(e.currentTarget);
    const Form = {
      fullName: data.get("fullname"),
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
    };
    console.log("Form", Form);
    try {
      const data = await axios.post(
        "https://chat-api-sqww.onrender.com/api/auth/register",
        Form
      );
      console.log(data);
      if (data?.data?.token) {
        localStorage.setItem("token", data.data.token);
        navigate("/chat");
      }
      e.target.reset();
    } catch (error) {
      console.log(error);
      window.alert("Register fail");
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Signup
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              name="fullname"
              className="w-full py-2 pl-10  border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="w-full py-2 pl-10  border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="w-full py-2 pl-10  border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="w-full py-2 pl-10  border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              on
            />
          </div>

          <button className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
