import React from "react";

const Banner = () => (
  <section className="w-full bg-gradient-to-r from-green-100 via-green-50 to-green-200 py-10 md:py-16 flex flex-col items-center justify-center shadow-inner">
    <div className="max-w-2xl text-center">
      <h1 className="text-3xl md:text-5xl font-bold text-green-800 mb-4">
        Free VIP Membership for New Users!
      </h1>
      <p className="text-lg md:text-xl text-green-700 mb-6">
        Enjoy exclusive discounts, priority delivery, and more. Limited time offer!
      </p>
      <a
        href="/signup"
        className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg shadow-lg font-semibold text-lg hover:bg-green-700 hover:scale-105 transition"
      >
        Claim Your VIP Now
      </a>
    </div>
  </section>
);

export default Banner;
