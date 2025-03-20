import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa"; // Import icons from react-icons

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold mb-6 text-center text-[#640D5F]" >LOGIN</h1>
        <form onSubmit={handleSubmit}>
          {/* Email Field with Icon */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-gray-400" /> {/* Email Icon */}
              </div>
              <input
                type="email"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Field with Icon */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" /> {/* Password Icon */}
              </div>
              <input
                type="password"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="ml-2 text-sm text-gray-900">Remember me</span>
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#aa1ba3] hover:bg-[#640D5F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            LOGIN
          </button>
        </form>

       
      </div>
    </div>
  );
};

export default Login;