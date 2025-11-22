import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const FarmerPortal = () => (
  <div className="flex min-h-screen bg-green-50">
    <Sidebar title="Farmer Portal" links={[
      { name: "Dashboard", icon: <span>📊</span>, active: true },
      { name: "My Listings", icon: <span>🧺</span>, active: false },
      { name: "Orders", icon: <span>📦</span>, active: false },
      { name: "Analytics", icon: <span>📈</span>, active: false },
      { name: "Settings", icon: <span>⚙️</span>, active: false },
    ]} />
    <div className="flex-1 flex flex-col">
      <Navbar />
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4 text-green-900">Farmer Portal</h1>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="text-lg font-semibold text-green-700 mb-2">Welcome, Farmer!</div>
          <div className="text-gray-700">Manage your produce listings, view orders, and track your sales analytics here.</div>
        </div>
      </main>
    </div>
  </div>
);

export default FarmerPortal;
