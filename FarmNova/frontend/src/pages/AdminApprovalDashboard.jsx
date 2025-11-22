import React, { useState, useEffect } from "react";

const AdminApprovalDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products with status "Pending" from backend
    fetch("/api/products?status=Pending")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      })
      .catch(() => setProducts([]));
  }, []);

  const handleStatus = async (id, status) => {
    // Update product status in backend
    try {
      await fetch(`/api/products/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ status }),
      });
      setProducts(products.map(p => p._id === id ? { ...p, status } : p));
    } catch {
      alert("Failed to update status.");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Admin Approval Dashboard</h2>
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
            {products.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center text-gray-500 py-8">
                  No products pending approval.<br />
                  Ask a farmer to upload a product first.
                </td>
              </tr>
            ) : (
              products.map(p => (
                <tr key={p._id} className="border-t">
                  <td className="py-2">{p.name}</td>
                  <td className="py-2">{p.farm}</td>
                  <td className="py-2">{p.status}</td>
                  <td className="py-2 flex gap-2">
                    <button
                      className={`px-3 py-1 rounded ${p.status === "Approved" ? "bg-gray-300" : "bg-green-600 text-white hover:bg-green-700"}`}
                      disabled={p.status === "Approved"}
                      onClick={() => handleStatus(p._id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className={`px-3 py-1 rounded ${p.status === "Rejected" ? "bg-gray-300" : "bg-red-600 text-white hover:bg-red-700"}`}
                      disabled={p.status === "Rejected"}
                      onClick={() => handleStatus(p._id, "Rejected")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminApprovalDashboard;
