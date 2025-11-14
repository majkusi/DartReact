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
    <div className="flex items-center justify-center min-h-screen text-white">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center space-y-4 bg-gray-800 p-8 rounded-2xl shadow-2xl w-96"
      >
        <h1 className="text-2xl font-bold mb-2">Register</h1>

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

        {/* Username */}
        <div className="flex flex-col w-full">
          <label className="mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
