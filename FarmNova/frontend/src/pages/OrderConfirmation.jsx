import React from "react";

const OrderConfirmation = () => {
  const orderDetails = JSON.parse(localStorage.getItem("orderDetails") || "{}");
  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded shadow p-6 text-center">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Order Confirmed!</h2>
      <div className="mb-2">Thank you for your purchase.</div>
      <div className="mb-4">
        <span className="font-semibold">Order Summary:</span>
        <ul className="mt-2 text-left inline-block">
          {(orderDetails.cart || []).map((item, idx) => (
            <li key={idx}>
              {item.name} x {item.quantity} — ₹{item.price * item.quantity}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-2">
        <span className="font-semibold">Total Paid:</span> ₹{orderDetails.total}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Delivery Address:</span> {orderDetails.address}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Expected Delivery Slot:</span> {orderDetails.slot}
      </div>
      {orderDetails.paymentId && (
        <div className="mb-2">
          <span className="font-semibold">Payment ID:</span> {orderDetails.paymentId}
        </div>
      )}
      <div className="mb-2">
        <span className="font-semibold">Payment Status:</span> {orderDetails.paymentStatus || "Pending"}
      </div>
      <div className="mt-4 text-gray-500 text-sm">You will receive a confirmation SMS soon.</div>
    </div>
  );
};

export default OrderConfirmation;
