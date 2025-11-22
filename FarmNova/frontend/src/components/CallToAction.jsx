import React from "react";

const CallToAction = () => (
  <section className="bg-green-700 py-16 text-center text-white">
    <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to transform your farm-to-table experience?</h2>
    <p className="mb-8 text-lg">Join thousands of farmers and consumers who are already benefiting from FarmNova's transparent, efficient marketplace.</p>
    <div className="flex justify-center gap-4">
      <a href="/signup" className="bg-white text-green-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-green-50 transition">Sign up for free</a>
      <a href="#learn-more" className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-green-800 transition">Learn more</a>
    </div>
  </section>
);

export default CallToAction;
