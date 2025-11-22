import React, { useState } from "react";
import axios from "axios";

const CustomerLogin = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const res = await axios.post("/api/customers/login", form);
      if (res.data && res.data.success) {
        setMessage("Login successful!");
        // Save token or redirect as needed
      } else {
        setError(res.data.message || "Error. Please try again.");
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
        <h2 className="text-2xl font-bold mb-4 text-center">Customer Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            Login
          </button>
        </form>
        {message && <div className="mt-4 text-center text-green-700">{message}</div>}
        {error && <div className="mt-4 text-center text-red-600">{error}</div>}
      </div>
    </div>
  );
};

export default CustomerLogin;
