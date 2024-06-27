import React from "react";

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Digital Product Creator",
      text: "This platform has transformed how I sell my online courses. The blockchain-powered affiliate system has expanded my reach exponentially!",
    },
    {
      name: "Alex Chen",
      role: "Affiliate Marketer",
      text: "The Blinks feature is revolutionary. I've seen a 300% increase in conversions since I started using these smart blockchain links.",
    },
    {
      name: "Emily Rodriguez",
      role: "Tech Blogger",
      text: "As someone who's always writing about the latest in tech, I'm impressed by how this platform seamlessly integrates blockchain into affiliate marketing.",
    },
    {
      name: "Michael Okoye",
      role: "E-book Author",
      text: "The instant payouts and transparent tracking have made this my go-to platform for selling my e-books. It's a game-changer for independent authors.",
    },
  ];

  return (
    <section className="py-12 bg-base-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <p>&quot;{testimonial.text}&quot;</p>
                <div className="card-actions justify-end">
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm opacity-50">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
