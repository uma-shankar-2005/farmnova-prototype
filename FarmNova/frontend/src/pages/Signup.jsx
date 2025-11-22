import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    // Replace with real API call
    if (form.email && form.password && form.name) {
      setSuccess(true);
      setTimeout(() => history.replace("/login"), 1200);
    } else {
      setError("All fields are required");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-white rounded shadow p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border rounded px-3 py-2"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border rounded px-3 py-2"
            value={form.email}
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
            Sign Up
          </button>
        </form>
        {error && <div className="mt-4 text-center text-red-600">{error}</div>}
        {success && <div className="mt-4 text-center text-green-700">Signup successful! Redirecting...</div>}
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 underline">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
