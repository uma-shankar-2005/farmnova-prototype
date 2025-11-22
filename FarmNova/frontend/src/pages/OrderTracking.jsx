import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const statusSteps = [
  { key: "ordered", label: "Ordered" },
  { key: "packed", label: "Packed" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" }
];

const statusOrder = ["ordered", "packed", "shipped", "delivered"];

const OrderTracking = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then(res => res.json())
      .then(data => {
        setOrder(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading order details...</div>;
  }
  if (!order) {
    return <div className="p-8 text-center text-red-600">Order not found.</div>;
  }

  // Example order.statusHistory: [{status: "ordered", time: "..."}, ...]
  const statusHistory = order.statusHistory || [
    { status: "ordered", time: order.createdAt }
  ];

  // Find the latest status
  const currentStatus = statusHistory.length
    ? statusHistory[statusHistory.length - 1].status
    : "ordered";

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded shadow p-6">
      <h2 className="text-2xl font-bold mb-6 text-green-700">Order Tracking</h2>
      <div className="mb-4">
        <span className="font-semibold">Order ID:</span> {order._id}
      </div>
      <div className="mb-6">
        <div className="flex flex-col gap-4">
          {statusSteps.map((step, idx) => {
            const found = statusHistory.find(s => s.status === step.key);
            const isActive = statusOrder.indexOf(currentStatus) >= idx;
            return (
              <div key={step.key} className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold
                    ${isActive ? "bg-green-600 text-white" : "bg-gray-300 text-gray-500"}`}
                >
                  {idx + 1}
                </div>
                <div>
                  <div className={`font-semibold ${isActive ? "text-green-700" : "text-gray-500"}`}>
                    {step.label}
                  </div>
                  <div className="text-xs text-gray-400">
                    {found && found.time ? new Date(found.time).toLocaleString() : ""}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <span className="font-semibold">Current Status:</span>{" "}
        <span className="text-green-700 font-bold capitalize">{currentStatus}</span>
      </div>
    </div>
  );
};

export default OrderTracking;
