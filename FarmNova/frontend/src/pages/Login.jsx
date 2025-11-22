import React, { useState } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const history = useHistory();
  const location = useLocation();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    // Replace with real API call
    if (form.email === "user@example.com" && form.password === "password") {
      localStorage.setItem("authToken", "demo-token");
      // Decode token to check role
      let userRole = null;
      try {
        userRole = JSON.parse(atob("demo-token".split('.')[1])).role;
      } catch {}
      // Redirect based on role
      if (userRole === "admin") {
        history.replace("/admin-approval");
      } else if (userRole === "farmer") {
        history.replace("/farmer-dashboard");
      } else {
        history.replace("/customer-dashboard");
      }
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-white rounded shadow p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            Login
          </button>
        </form>
        {error && <div className="mt-4 text-center text-red-600">{error}</div>}
        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-green-700 underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
