import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Settings = () => (
  <div className="flex min-h-screen bg-green-50">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Navbar />
      <main className="p-6 max-w-xl">
        <h1 className="text-3xl font-bold mb-4 text-green-900">Settings</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input className="w-full px-4 py-2 rounded-lg border border-green-200" defaultValue="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input className="w-full px-4 py-2 rounded-lg border border-green-200" defaultValue="john@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" className="w-full px-4 py-2 rounded-lg border border-green-200" />
          </div>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
            Save Changes
          </button>
        </form>
      </main>
    </div>
  </div>
);

export default Settings;
