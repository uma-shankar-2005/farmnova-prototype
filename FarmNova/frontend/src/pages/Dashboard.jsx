import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

// Utility to fetch role from localStorage
const getUserRole = () => {
  return localStorage.getItem("role") || "customer";
};

// =================== Farmer Dashboard ===================
const FarmerOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders/farmer")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch(() => setOrders([]));
  }, []);

  return (
    <div className="bg-white rounded shadow p-6 mb-6">
      <h3 className="font-semibold mb-2">Incoming Orders</h3>
      {orders.length === 0 ? (
        <div className="text-gray-500">No incoming orders.</div>
      ) : (
        <ul className="divide-y">
          {orders.map((order) => (
            <li key={order._id} className="py-2">
              <div className="flex justify-between">
                <span>Order #{order._id.slice(-6)}</span>
                <span className="text-xs text-gray-500">{order.status}</span>
              </div>
              <div className="text-sm text-gray-600">
                Customer: {order.customerName}
              </div>
              <div className="text-sm text-gray-600">
                Items: {order.items.map((i) => i.name).join(", ")}
              </div>
              <div className="text-sm text-green-700 font-semibold">
                Total: ₹{order.total}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const FarmerDashboard = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Farmer Dashboard</h2>
    <div className="bg-white rounded shadow p-6 mb-6">
      <h3 className="font-semibold mb-2">Product Management</h3>
      <ul className="list-disc ml-6 text-gray-700">
        <li>Add/Edit/Delete Products</li>
        <li>View Product Listings</li>
        <li>Manage Inventory</li>
        <li>View Orders</li>
      </ul>
    </div>
    <FarmerOrders />
  </div>
);

// =================== Customer Dashboard ===================
const CustomerDashboard = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    fetch("/api/orders/my", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []));
  }, []);

  const subscriptions = [
    { plan: "Monthly Veggie Box", status: "Active", renews: "2024-07-01" },
  ];

  const profile = {
    name: "Customer Name",
    email: "customer@email.com",
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6">Customer Dashboard</h2>

      <div className="bg-white rounded shadow p-6 mb-6">
        <h3 className="font-semibold mb-2">Order History</h3>
        {orders.length === 0 ? (
          <div className="text-gray-500">No orders found.</div>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order._id} className="mb-2">
                <div>
                  <span className="font-bold">Order Total:</span> ₹{order.total}
                  <br />
                  <span className="font-bold">Status:</span> {order.paymentStatus}
                  <br />
                  <span className="font-bold">Payment ID:</span> {order.paymentId}
                  <br />
                  <span className="font-bold">Date:</span>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </div>
                <div>
                  {order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.name} x {item.quantity} &nbsp;
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white rounded shadow p-6 mb-6">
        <h3 className="font-semibold mb-2">Subscriptions</h3>
        <ul>
          {subscriptions.map((s, idx) => (
            <li key={idx}>
              {s.plan} — {s.status} (Renews: {s.renews})
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded shadow p-6">
        <h3 className="font-semibold mb-2">Profile</h3>
        <div>Name: {profile.name}</div>
        <div>Email: {profile.email}</div>
      </div>
    </div>
  );
};

// =================== Main Dashboard Page ===================
const Dashboard = () => {
  const role = getUserRole();

  return (
    <div className="flex min-h-screen bg-green-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-green-900">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="text-lg font-semibold text-green-700 mb-2">Orders</div>
              <div className="text-3xl font-bold text-green-900">12</div>
              <div className="text-sm text-gray-500">Active Orders</div>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <div className="text-lg font-semibold text-green-700 mb-2">Wishlist</div>
              <div className="text-3xl font-bold text-green-900">5</div>
              <div className="text-sm text-gray-500">Saved Items</div>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <div className="text-lg font-semibold text-green-700 mb-2">Subscriptions</div>
              <div className="text-3xl font-bold text-green-900">2</div>
              <div className="text-sm text-gray-500">Active Plans</div>
            </div>
          </div>

          <div className="container mx-auto py-8 px-4">
            {role === "farmer" ? <FarmerDashboard /> : <CustomerDashboard />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
export { CustomerDashboard };
