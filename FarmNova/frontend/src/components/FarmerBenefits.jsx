import React from "react";
import { FaRupeeSign, FaChartBar, FaTruck } from "react-icons/fa";

const FarmerBenefits = () => (
  <section className="bg-gray-50 py-16" id="farmers">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 px-4">
      <div className="flex-1">
        <img src="/assets/farm-sunrise.jpg" alt="Farm Sunrise" className="rounded-xl shadow-lg w-full max-w-md object-cover" />
        <div className="absolute bg-white rounded-lg shadow px-4 py-2 left-24 top-48 flex items-center gap-2">
          <FaRupeeSign className="text-green-600" />
          <span className="font-semibold text-green-700">Average increase +28% Income</span>
        </div>
      </div>
      <div className="flex-1">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Benefits for Farmers</h2>
        <p className="text-gray-700 mb-6">FarmNova empowers farmers with technology and direct market access.</p>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="bg-green-600 text-white rounded-full p-2"><FaRupeeSign /></span>
            <div>
              <div className="font-bold text-green-900">Better Prices</div>
              <div className="text-gray-700">Our AI-powered pricing suggestions help you get fair prices by analyzing market trends.</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="bg-green-600 text-white rounded-full p-2"><FaChartBar /></span>
            <div>
              <div className="font-bold text-green-900">Market Insights</div>
              <div className="text-gray-700">Real-time data on demand patterns helps you plan your crops better.</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="bg-green-600 text-white rounded-full p-2"><FaTruck /></span>
            <div>
              <div className="font-bold text-green-900">Logistics Support</div>
              <div className="text-gray-700">We handle storage, packaging and delivery so you can focus on farming.</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
);

export default FarmerBenefits;
