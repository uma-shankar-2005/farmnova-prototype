import React from "react";
import { FaLeaf, FaTruck, FaMobileAlt, FaShoppingCart, FaUsers, FaSeedling, FaWeight } from "react-icons/fa";

const stats = [
  { icon: <FaUsers className="text-green-600 text-2xl" />, label: "10,000+", desc: "happy customers" },
  { icon: <FaSeedling className="text-green-600 text-2xl" />, label: "1,000+", desc: "farmers connected" },
  { icon: <FaWeight className="text-green-600 text-2xl" />, label: "100+", desc: "tons of produce delivered" },
];

const why = [
  { icon: <FaLeaf className="text-green-600 text-xl" />, text: "Fair Prices to Farmers" },
  { icon: <FaTruck className="text-green-600 text-xl" />, text: "Same-Day Fresh Delivery" },
  { icon: <FaMobileAlt className="text-green-600 text-xl" />, text: "Easy-to-Use Platform" },
  { icon: <FaShoppingCart className="text-green-600 text-xl" />, text: "Transparent Pricing" },
];

const About = () => (
  <main className="bg-neutral-50 dark:bg-neutral-900 min-h-screen">
    {/* Hero Section */}
    <section
      className="w-full min-h-[260px] flex flex-col items-center justify-center text-center px-4 py-16 md:py-24 relative"
      style={{
        backgroundImage: "linear-gradient(rgba(34,197,94,0.7),rgba(34,197,94,0.5)), url('/assets/about-hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
        Connecting Farmers Directly to You
      </h1>
      <p className="text-lg md:text-2xl text-white font-light drop-shadow">
        Freshness from the farm. Trust from the source.
      </p>
    </section>

    {/* Our Mission */}
    <section className="max-w-3xl mx-auto py-10 px-4 text-center">
      <h2 className="text-2xl font-bold text-green-700 mb-3">Our Mission</h2>
      <p className="text-gray-700 dark:text-gray-200 text-lg">
        FarmNova is on a mission to revolutionize the agri-supply chain by enabling farmers to sell directly to consumers and stores, cutting middlemen, increasing profits for farmers, and bringing fresher, healthier food to your table.
      </p>
    </section>

    {/* Why FarmNova */}
    <section className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">Why FarmNova?</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {why.map((item, idx) => (
          <li key={idx} className="flex flex-col items-center gap-2 bg-white dark:bg-gray-800 rounded-xl shadow p-4">
            {item.icon}
            <span className="font-semibold text-gray-800 dark:text-gray-100">{item.text}</span>
          </li>
        ))}
      </ul>
    </section>

    {/* Impact in Numbers */}
    <section className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">Impact in Numbers</h2>
      <div className="flex flex-col md:flex-row justify-center gap-8">
        {stats.map((s, idx) => (
          <div key={idx} className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl shadow p-6 min-w-[140px]">
            {s.icon}
            <div className="text-2xl font-bold text-green-700 mt-2">{s.label}</div>
            <div className="text-gray-600 dark:text-gray-300 text-sm">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>

    {/* Founder's Message */}
    <section className="max-w-3xl mx-auto py-8 px-4 text-center">
      <h2 className="text-2xl font-bold text-green-700 mb-3">Meet the Team</h2>
      <p className="text-gray-700 dark:text-gray-200 text-lg">
        “We started FarmNova with a vision to empower farmers and deliver the freshest food to every home. Thank you for being part of our journey to make food fairer, healthier, and more sustainable for all.”<br />
        <span className="font-semibold text-green-700">— The FarmNova Team</span>
      </p>
    </section>

    {/* Call to Action */}
    <section className="flex flex-col items-center gap-4 py-10">
      <div className="flex flex-wrap gap-4 justify-center">
        <a
          href="/marketplace"
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-700 hover:scale-105 transition"
        >
          Browse Marketplace
        </a>
        <a
          href="/farmer-signup"
          className="bg-white text-green-700 border border-green-600 px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-50 hover:scale-105 transition"
        >
          Join as Farmer
        </a>
        <a
          href="https://play.google.com/store"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white px-6 py-3 rounded-lg font-semibold shadow hover:scale-105 transition flex items-center gap-2"
        >
          <img src="/assets/playstore.svg" alt="Google Play" className="w-6 h-6" />
          Download App
        </a>
      </div>
    </section>
  </main>
);

export default About;
