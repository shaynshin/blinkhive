import Link from "next/link";
import React from "react";

const Benefits: React.FC = () => {
  const benefits = [
    {
      type: "For Affiliates",
      items: [
        { text: "Easy product selection", icon: "🛒" },
        { text: "Instant commission payouts", icon: "⚡" },
        { text: "Customizable Blinks for sharing", icon: "🔗" },
      ],
      color: "primary",
    },
    {
      type: "For Merchants",
      items: [
        { text: "Expand your reach", icon: "🌐" },
        { text: "Increase sales through affiliate network", icon: "📈" },
        { text: "Automated commission payouts", icon: "💸" },
      ],
      color: "secondary",
    },
  ];

  return (
    <section
      id="benefits"
      className="py-20 bg-gradient-to-br from-base-200 to-base-300"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center mb-16 text-base-content">
          Monetise Your Digital Space
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`card bg-base-100 shadow-xl border-t-4 ${
                index === 0 ? "border-primary" : "border-secondary"
              } hover:shadow-2xl transition-shadow duration-300`}
            >
              <div className="card-body">
                <h3 className={`text-2xl font-bold mb-6 text-${benefit.color}`}>
                  {benefit.type}
                </h3>
                <ul className="space-y-2">
                  {benefit.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center">
                      <span className={`text-2xl mr-4 p-2 rounded-full`}>
                        {item.icon}
                      </span>
                      <span className="text-lg">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16 text-center">
        <Link href="/dashboard/affiliate/browse" className="btn btn-primary btn-base btn-lg">
          Get Started Now
        </Link>
      </div>
    </section>
  );
};

export default Benefits;
