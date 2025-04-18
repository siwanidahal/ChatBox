import { Link, useNavigate } from 'react-router';
import { FaEnvelope, FaLock, } from 'react-icons/fa'
import axios from "axios"
import useCheckAuth from '../hooks/useCheckToken';
import { useState } from 'react';


const Login = () => {
  const [error, setError] = useState("");

  const navigate =useNavigate()
  useCheckAuth()
 async function handleSubmit(e){
e.preventDefault()

const data=new FormData(e.currentTarget)
const Form={
  email:data.get("email"),
  password:data.get("password")
}
console.log("Form",Form)
try{
  const data = await axios.post("https://chat-api-sqww.onrender.com/api/auth/login",Form)
  console.log(data);
  if (data?.data?.token) {
    localStorage.setItem("token", data.data.token);
    navigate("/chat");
  }
  e.target.reset();
} catch (error) {
  console.log(error);
setError('Invalid Information')
}
}

  return (
    <div className="flex items-center justify-center min h-screen ">
      <div className="w-full max-w-md bg-white rounded-lg  p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

        <form className='space-y-6'
     onSubmit={handleSubmit}
        >
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Email"
          name="email"
              className="w-full py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
           
            />

          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
             name="password"
              className="w-full py-2 pl-10  border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            
            />
           
          </div>
         
          {error && <p className=" text-red-500 text-sm">{error}</p>}
          <button type=" submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
         >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
