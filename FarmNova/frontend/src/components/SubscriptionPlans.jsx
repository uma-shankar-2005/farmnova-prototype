import React from "react";

const plans = [
  {
    title: "Weekly",
    price: 299,
    period: "week",
    features: [
      "✅ Express delivery",
      "✅ Fresh farm produce",
      "✅ Cancel anytime",
      "✅ Support local farmers",
    ],
  },
  {
    title: "Weekly + 5% off",
    price: 499,
    period: "week",
    features: [
      "✅ Express delivery",
      "✅ Fresh farm produce",
      "✅ Cancel anytime",
      "✅ Support local farmers",
      "✅ 5% discount",
    ],
  },
  {
    title: "Weekly +20% off",
    price: 999,
    period: "week",
    features: [
      "✅ Express delivery",
      "✅ Fresh farm produce",
      "✅ Cancel anytime",
      "✅ Support local farmers",
      "✅ 20% discount",
      "✅ Free surprise gift",
    ],
  },
];

const SubscriptionPlans = () => {
  return (
    <section className="py-10 px-2 md:px-0">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Choose Your Plan
      </h2>
      <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto w-full">
        {plans.map((plan, idx) => (
          <div
            key={plan.title}
            className="flex-1 bg-white rounded-2xl shadow-md p-6 flex flex-col items-center transition transform hover:scale-105 hover:shadow-xl cursor-pointer border-2 border-transparent relative w-full min-w-[220px]"
          >
            <div className="text-xl font-bold mb-2">{plan.title}</div>
            <div className="text-3xl font-bold text-green-600 mb-2">
              ₹{plan.price}
              <span className="text-base font-normal text-gray-500">
                /{plan.period}
              </span>
            </div>

            <ul className="mb-4 text-left w-full max-w-xs mx-auto">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 mb-1 relative">
                  <span>{feature}</span>
                  {/* Tooltip icon (optional info icon) */}
                  {/* <span data-tooltip-id={`feature-tip-${idx}-${i}`} data-tooltip-content="More info">
                    <svg height="14" width="14" viewBox="0 0 20 20" fill="#2563eb">
                      <text x="4" y="14" fontSize="12" fill="#2563eb">i</text>
                    </svg>
                  </span>
                  <Tooltip id={`feature-tip-${idx}-${i}`} effect="solid" /> */}
                </li>
              ))}
            </ul>

            <button
              className="bg-green-600 text-white px-6 py-2 rounded font-semibold mt-auto transition
    hover:bg-green-700 active:shadow-lg active:bg-green-800"
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>

      {/* Optional glow animation style */}
      <style>
        {`
          @keyframes glow {
            0% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5);}
            50% { box-shadow: 0 0 16px 4px rgba(34,197,94,0.5);}
            100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5);}
          }
          .animate-glow {
            animation: glow 2s infinite;
          }
        `}
      </style>
    </section>
  );
};

export default SubscriptionPlans;

