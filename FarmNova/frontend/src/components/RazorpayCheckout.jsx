import React from "react";

const loadScript = (src) =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const RazorpayCheckout = ({ amount, onSuccess }) => {
  const handlePayment = async () => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay key id
      amount: amount * 100,
      currency: "INR",
      name: "FarmNova",
      description: "Order Payment",
      handler: function (response) {
        if (onSuccess) onSuccess(response);
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      theme: {
        color: "#22c55e",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <button
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold mt-4"
      onClick={handlePayment}
    >
      Pay ₹{amount}
    </button>
  );
};

export default RazorpayCheckout;
   