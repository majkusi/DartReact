import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router";

interface LoginResponse {
  token: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

const loginUser = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await fetch("https://localhost:5001/api/Users/Login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Invalid username or password");
  }

  return response.json();
};

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      alert("Logged in successfully!");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full max-w-md space-y-6 bg-black border-2 border-cyan-500 
                   rounded-3xl p-8 shadow-[0_0_20px_cyan,0_0_40px_skyblue] transition-transform duration-300 
                   hover:scale-105"
      >
        <h1 className="text-3xl font-extrabold text-white mb-2 tracking-wider">
          Login
        </h1>

        {/* Email */}
        <div className="flex flex-col w-full">
          <label className="mb-1 text-white font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black border-2 border-cyan-500 p-3 rounded-xl text-white placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password */}
        <div className="flex flex-col w-full">
          <label className="mb-1 text-white font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-black border-2 border-cyan-500 p-3 rounded-xl text-white placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full h-14 rounded-full bg-black text-white font-bold text-lg border-2 border-cyan-500
                     shadow-[0_0_15px_cyan,0_0_30px_skyblue] transition-transform duration-300 
                     hover:scale-105 hover:shadow-[0_0_25px_cyan,0_0_50px_skyblue] disabled:opacity-50"
        >
          {mutation.isPending ? "Logging in..." : "Login"}
        </button>

        {/* Error Message */}
        {mutation.isError && (
          <p className="text-red-400 text-sm">{mutation.error.message}</p>
        )}

        <Link
          to="/register"
          className="mt-4 text-cyan-400 hover:text-cyan-200 transition"
        >
          Don't have an account? Register!
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
