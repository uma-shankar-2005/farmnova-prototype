import React from "react";
import { FaUserTie, FaCity, FaBox } from "react-icons/fa";

const stats = [
  { value: "50K+", label: "Farmers", icon: <FaUserTie className="text-3xl text-green-600" /> },
  { value: "100+", label: "Cities Served", icon: <FaCity className="text-3xl text-green-600" /> },
  { value: "10M+", label: "Orders Fulfilled", icon: <FaBox className="text-3xl text-green-600" /> },
];

const Stats = () => (
  <section className="bg-green-600 py-12">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-center items-center gap-12">
      {stats.map((s) => (
        <div key={s.label} className="text-center flex flex-col items-center">
          {s.icon}
          <div className="text-4xl md:text-5xl font-extrabold text-white">{s.value}</div>
          <div className="text-lg text-green-100">{s.label}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Stats;
