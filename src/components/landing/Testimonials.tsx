import React from "react";

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Digital Product Creator",
      text: "This platform has transformed how I sell my online courses. The blockchain-powered affiliate system has expanded my reach exponentially!",
      avatar: (
        <svg className="w-12 h-12" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
            <circle cx="18" cy="18" r="18" fill="#C4C4C4"/>
          </mask>
          <g mask="url(#mask0)">
            <rect width="36" height="36" fill="#FF9800"/>
            <circle cx="18" cy="15" r="8" fill="#FFF"/>
            <circle cx="18" cy="35" r="14" fill="#FFF"/>
          </g>
        </svg>
      ),
    },
    {
      name: "Alex Chen",
      role: "Affiliate Marketer",
      text: "The Blinks feature is revolutionary. I've seen a 300% increase in conversions since I started using these smart blockchain links.",
      avatar: (
        <svg className="w-12 h-12" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask1" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
            <circle cx="18" cy="18" r="18" fill="#C4C4C4"/>
          </mask>
          <g mask="url(#mask1)">
            <rect width="36" height="36" fill="#4CAF50"/>
            <circle cx="18" cy="15" r="8" fill="#FFF"/>
            <circle cx="18" cy="35" r="14" fill="#FFF"/>
          </g>
        </svg>
      ),
    },
    {
      name: "Emily Rodriguez",
      role: "Tech Blogger",
      text: "As someone who's always writing about the latest in tech, I'm impressed by how this platform seamlessly integrates blockchain into affiliate marketing.",
      avatar: (
        <svg className="w-12 h-12" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask2" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
            <circle cx="18" cy="18" r="18" fill="#C4C4C4"/>
          </mask>
          <g mask="url(#mask2)">
            <rect width="36" height="36" fill="#2196F3"/>
            <circle cx="18" cy="15" r="8" fill="#FFF"/>
            <circle cx="18" cy="35" r="14" fill="#FFF"/>
          </g>
        </svg>
      ),
    },
    {
      name: "Michael Okoye",
      role: "E-book Author",
      text: "The instant payouts and transparent tracking have made this my go-to platform for selling my e-books. It's a game-changer for independent authors.",
      avatar: (
        <svg className="w-12 h-12" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask3" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
            <circle cx="18" cy="18" r="18" fill="#C4C4C4"/>
          </mask>
          <g mask="url(#mask3)">
            <rect width="36" height="36" fill="#9C27B0"/>
            <circle cx="18" cy="15" r="8" fill="#FFF"/>
            <circle cx="18" cy="35" r="14" fill="#FFF"/>
          </g>
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <p className="mb-4">&quot;{testimonial.text}&quot;</p>
                <div className="flex items-center">
                  {testimonial.avatar}
                  <div className="ml-4">
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm opacity-50">{testimonial.role}</div>
                  </div>
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