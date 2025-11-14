import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

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
    <div className="flex items-center justify-center min-h-screen text-white">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center space-y-4 bg-gray-800 p-8 rounded-2xl shadow-2xl w-96"
      >
        <h1 className="text-2xl font-bold mb-2">Login</h1>

        {/* Email */}
        <div className="flex flex-col w-full">
          <label className="mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-500 border-2 border-white p-2 rounded-md text-white"
            required
          />
        </div>

        {/* Password */}
        <div className="flex flex-col w-full">
          <label className="mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-500 border-2 border-white p-2 rounded-md text-white"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={mutation.isPending}
          className="rounded-xl shadow-xl bg-gray-900 w-60 h-14 text-white border-2 border-blue-400 hover:bg-blue-600 transition disabled:opacity-50"
        >
          {mutation.isPending ? "Logging in..." : "Login"}
        </button>

        {mutation.isError && (
          <p className="text-red-400 text-sm">{mutation.error.message}</p>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
