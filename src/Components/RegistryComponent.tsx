import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

interface RegistryResponse {
  statusCode: string;
}

interface RegistryCredentials {
  email: string;
  username: string;
  password: string;
}

const registerUser = async (credentials: RegistryCredentials) => {
  const response = await fetch("https://localhost:5001/api/Users/Register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials, try again");
  }

  const responseText = await response.text();
  if (!responseText.trim()) return { statusCode: "200" };

  try {
    return JSON.parse(responseText) as RegistryResponse;
  } catch (e) {
    throw new Error("Received invalid JSON from server " + e);
  }
};

const RegistryComponent: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation<RegistryResponse, Error, RegistryCredentials>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      alert("Register completed successfully: " + data.statusCode);
    },
    onError: (error) => {
      alert("Error: " + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ email, username, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-full max-w-md space-y-6 bg-black border-2 border-cyan-500 
                   rounded-3xl p-8 shadow-[0_0_20px_cyan,0_0_40px_skyblue] transition-transform duration-300 
                   hover:scale-105"
      >
        <h1 className="text-3xl font-extrabold text-white mb-2 tracking-wider">
          Register
        </h1>

        {/* Email */}
        <div className="flex flex-col w-full">
          <label className="mb-1 text-white font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black border-2 border-cyan-500 p-3 rounded-xl text-white placeholder-gray-400 focus:outline-none 
                       focus:ring-2 focus:ring-cyan-400 transition"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Username */}
        <div className="flex flex-col w-full">
          <label className="mb-1 text-white font-semibold">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-black border-2 border-cyan-500 p-3 rounded-xl text-white placeholder-gray-400 focus:outline-none 
                       focus:ring-2 focus:ring-cyan-400 transition"
            placeholder="Choose a username"
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
            className="bg-black border-2 border-cyan-500 p-3 rounded-xl text-white placeholder-gray-400 focus:outline-none 
                       focus:ring-2 focus:ring-cyan-400 transition"
            placeholder="Enter a password"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full h-14 rounded-full bg-black text-white font-bold text-lg border-2 border-cyan-500
                     shadow-[0_0_15px_cyan,0_0_30px_skyblue] transition-transform duration-300 hover:scale-105 
                     hover:shadow-[0_0_25px_cyan,0_0_50px_skyblue] disabled:opacity-50"
        >
          {mutation.isPending ? "Registering..." : "Register"}
        </button>

        {mutation.isError && (
          <p className="text-red-400 text-sm">{mutation.error.message}</p>
        )}
      </form>
    </div>
  );
};

export default RegistryComponent;
