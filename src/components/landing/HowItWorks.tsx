import React from "react";

const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: "Sign Up",
      description:
        "Create your account as a merchant or affiliate. With the use of third party Auth solution, Magic Link, this process takes less than 30 seconds.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      ),
    },
    {
      title: "Connect Wallet",
      description:
        "Link your Solana wallet to your account. For affiliates, this wallet will receive instant commission. For merchants, this wallet will receive instant payouts.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
          />
        </svg>
      ),
    },
    {
      title: "Create or Choose",
      description:
        "Merchants upload products onto the platform and it will be instantly available on the products catalogue. Affiliates select products to promote and create their unique Blink.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
      ),
    },
    {
      title: "Share and Earn",
      description:
        "Share your unique Blinks on compatible platforms such as X and earn instant commissions on sales.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 bg-base-100" id="how-it-works">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <ul className="timeline timeline-vertical max-md:timeline-compact">
          {steps.map((step, index) => (
            <li key={index}>
              {index > 0 && <hr className="bg-primary  max-md:hidden" />}
              {index % 2 === 0 ? (
                <>
                  <div className="timeline-start timeline-box p-8 md:max-w-md shadow-2xl md:mr-12">
                    <div className="flex items-center gap-3">
                      <div className="h-12 flex items-center justify-start text-white">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </div>
                    <p>{step.description}</p>
                  </div>
                  <div className="timeline-middle max-md:hidden">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                      {step.icon}
                    </div>
                  </div>
                  <div className="timeline-end timeline-box bg-primary text-primary-content ml-4 max-md:hidden">
                    Step {index + 1}
                  </div>
                </>
              ) : (
                <>
                  <div className="timeline-start timeline-box bg-primary text-primary-content mr-4  max-md:hidden">
                    Step {index + 1}
                  </div>
                  <div className="timeline-middle max-md:hidden">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
                      {step.icon}
                    </div>
                  </div>
                  <div className="timeline-end timeline-box p-8 md:max-w-md shadow-2xl md:ml-12  mb-2">
                    <div className="flex items-center gap-3">
                      <div className="h-12 flex items-center justify-start text-white">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </div>
                    <p>{step.description}</p>
                  </div>
                </>
              )}
              {index < steps.length - 1 && (
                <hr className="bg-primary max-md:hidden" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HowItWorks;
