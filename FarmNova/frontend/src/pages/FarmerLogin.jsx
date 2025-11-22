import React, { useState } from "react";
import axios from "axios";

const FarmerLogin = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");
    setError("");
    const endpoint = isSignup ? "/api/farmers/register" : "/api/farmers/login";
    try {
      if (isSignup && form.password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
      const res = await axios.post(endpoint, form);
      if (res.data && res.data.token) {
        localStorage.setItem("authToken", res.data.token);
        setMessage("Login successful!");
        // Redirect or update UI as needed
      } else if (res.data && res.data.message) {
        setMessage(res.data.message);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Server error. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-white rounded shadow p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">{isSignup ? "Farmer Sign Up" : "Farmer Login"}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isSignup && (
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border rounded px-3 py-2"
              value={form.email}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="border rounded px-3 py-2"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border rounded px-3 py-2"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <button
          className="mt-4 text-green-700 underline text-sm"
          onClick={() => { setIsSignup(s => !s); setMessage(""); setError(""); }}
        >
          {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </button>
        {message && <div className="mt-4 text-center text-green-700">{message}</div>}
        {error && <div className="mt-4 text-center text-red-600">{error}</div>}
      </div>
    </div>
  );
};

export default FarmerLogin;
