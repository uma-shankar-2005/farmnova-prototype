import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// Dummy data
const overview = {
  totalOrders: 1240,
  dailyTraffic: 312,
  popularProducts: [
    { name: "Tomatoes", sales: 320 },
    { name: "Carrots", sales: 290 },
    { name: "Apples", sales: 250 },
    { name: "Spinach", sales: 210 },
    { name: "Milk", sales: 180 },
  ],
};

const weeklyOrders = [
  { day: "Mon", orders: 120 },
  { day: "Tue", orders: 140 },
  { day: "Wed", orders: 110 },
  { day: "Thu", orders: 160 },
  { day: "Fri", orders: 180 },
  { day: "Sat", orders: 200 },
  { day: "Sun", orders: 130 },
];

const mockProducts = [
  { id: 1, name: "Tomatoes", farmer: "Ravi Kumar", status: "Pending" },
  { id: 2, name: "Carrots", farmer: "Sita Devi", status: "Approved" },
  { id: 3, name: "Spinach", farmer: "Amit Singh", status: "Rejected" },
];

const mockFarmers = [
  { id: 1, name: "Ravi Kumar", email: "ravi@farm.com", status: "Active", rating: 4.7 },
  { id: 2, name: "Sita Devi", email: "sita@farm.com", status: "Pending", rating: 4.2 },
  { id: 3, name: "Amit Singh", email: "amit@farm.com", status: "Suspended", rating: 3.9 },
];

const AdminDashboard = () => {
  const [products, setProducts] = useState(mockProducts);
  const [farmers, setFarmers] = useState(mockFarmers);

  const handleProductStatus = (id, status) => {
    setProducts(products.map(p => p.id === id ? { ...p, status } : p));
  };

  const handleFarmerStatus = (id, status) => {
    setFarmers(farmers.map(f => f.id === id ? { ...f, status } : f));
  };

  return (
    <div className="container mx-auto py-8 px-2 md:px-8">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded shadow p-6 text-center">
          <div className="text-3xl font-bold">{overview.totalOrders}</div>
          <div className="text-gray-600">Total Orders</div>
        </div>
        <div className="bg-white rounded shadow p-6 text-center">
          <div className="text-3xl font-bold">{overview.dailyTraffic}</div>
          <div className="text-gray-600">Visits Today</div>
        </div>
        <div className="bg-white rounded shadow p-6 text-center">
          <div className="font-semibold mb-2">Top 5 Products</div>
          <ul>
            {overview.popularProducts.map((p, idx) => (
              <li key={p.name} className="flex justify-between text-sm">
                <span>{idx + 1}. {p.name}</span>
                <span className="font-bold">{p.sales}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Weekly Order Trends Chart */}
      <div className="bg-white rounded shadow p-6 mb-8">
        <h3 className="font-semibold mb-4">Weekly Order Trends</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weeklyOrders}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="orders" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Product Management Table */}
      <div className="bg-white rounded shadow p-6 mb-8">
        <h3 className="font-semibold mb-4">Product Management</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">Product Name</th>
                <th className="py-2">Farmer Name</th>
                <th className="py-2">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-t">
                  <td className="py-2">{p.name}</td>
                  <td className="py-2">{p.farmer}</td>
                  <td className="py-2">{p.status}</td>
                  <td className="py-2 flex gap-2">
                    <button
                      className={`px-3 py-1 rounded ${p.status === "Approved" ? "bg-gray-300" : "bg-green-600 text-white hover:bg-green-700"}`}
                      disabled={p.status === "Approved"}
                      onClick={() => handleProductStatus(p.id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className={`px-3 py-1 rounded ${p.status === "Rejected" ? "bg-gray-300" : "bg-red-600 text-white hover:bg-red-700"}`}
                      disabled={p.status === "Rejected"}
                      onClick={() => handleProductStatus(p.id, "Rejected")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Farmer Management Table */}
      <div className="bg-white rounded shadow p-6 mb-8">
        <h3 className="font-semibold mb-4">Farmer Management</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">Farmer Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Status</th>
                <th className="py-2">Rating</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {farmers.map(f => (
                <tr key={f.id} className="border-t">
                  <td className="py-2">{f.name}</td>
                  <td className="py-2">{f.email}</td>
                  <td className="py-2">{f.status}</td>
                  <td className="py-2">{f.rating}</td>
                  <td className="py-2 flex gap-2">
                    <button
                      className={`px-3 py-1 rounded ${f.status === "Active" ? "bg-gray-300" : "bg-green-600 text-white hover:bg-green-700"}`}
                      disabled={f.status === "Active"}
                      onClick={() => handleFarmerStatus(f.id, "Active")}
                    >
                      Approve
                    </button>
                    <button
                      className={`px-3 py-1 rounded ${f.status === "Suspended" ? "bg-gray-300" : "bg-yellow-600 text-white hover:bg-yellow-700"}`}
                      disabled={f.status === "Suspended"}
                      onClick={() => handleFarmerStatus(f.id, "Suspended")}
                    >
                      Suspend
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// AdminDashboard with users, orders, products, and approval management

export default AdminDashboard;
