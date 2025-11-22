import React from "react";

const SolutionBlock = ({
  image,
  heading,
  bullets,
  cta,
  reverse = false,
}) => (
  <section className={`max-w-7xl mx-auto px-4 md:px-8 py-12 flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""} items-center gap-10`}>
    <img src={image} alt={heading} className="w-full md:w-1/2 rounded-xl shadow-lg" />
    <div className="flex-1">
      <h3 className="text-2xl font-bold text-green-800 mb-4">{heading}</h3>
      <ul className="mb-6 space-y-2">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1 text-green-600">•</span>
            <span className="text-gray-700">{b}</span>
          </li>
        ))}
      </ul>
      <a href="/solutions" className="inline-block px-6 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition">{cta}</a>
    </div>
  </section>
);

export default SolutionBlock;
