import React, { useEffect, useState } from "react";

const AdminPanel = () => {
  const [stats, setStats] = useState({ users: 0, subscriptions: 0, revenue: 0 });
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch stats and pending farmer profiles
    const fetchData = async () => {
      setLoading(true);
      try {
        const statsRes = await fetch("/api/admin/stats");
        const statsData = await statsRes.json();
        setStats(statsData);

        const farmersRes = await fetch("/api/admin/farmers");
        const farmersData = await farmersRes.json();
        setFarmers(farmersData);
      } catch {
        // handle error
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleApprove = async (id) => {
    await fetch(`/api/admin/farmers/${id}/approve`, { method: "POST" });
    setFarmers(farmers => farmers.filter(f => f._id !== id));
  };

  const handleReject = async (id) => {
    await fetch(`/api/admin/farmers/${id}/reject`, { method: "POST" });
    setFarmers(farmers => farmers.filter(f => f._id !== id));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded shadow p-6 text-center">
              <div className="text-3xl font-bold">{stats.users}</div>
              <div className="text-gray-600">Total Users</div>
            </div>
            <div className="bg-white rounded shadow p-6 text-center">
              <div className="text-3xl font-bold">{stats.subscriptions}</div>
              <div className="text-gray-600">Active Subscriptions</div>
            </div>
            <div className="bg-white rounded shadow p-6 text-center">
              <div className="text-3xl font-bold">₹{stats.revenue}</div>
              <div className="text-gray-600">Total Revenue</div>
            </div>
          </div>
          <div className="bg-white rounded shadow p-6">
            <h3 className="font-semibold mb-4">Pending Farmer Profiles</h3>
            {farmers.length === 0 ? (
              <div className="text-gray-500">No pending profiles.</div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="py-2">Name</th>
                    <th className="py-2">Farm</th>
                    <th className="py-2">Location</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {farmers.map(farmer => (
                    <tr key={farmer._id} className="border-t">
                      <td className="py-2">{farmer.name}</td>
                      <td className="py-2">{farmer.farmName}</td>
                      <td className="py-2">{farmer.location}</td>
                      <td className="py-2 flex gap-2">
                        <button
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                          onClick={() => handleApprove(farmer._id)}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                          onClick={() => handleReject(farmer._id)}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPanel;
