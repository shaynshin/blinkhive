"use client";

import { useEffect } from "react";

export default function TallyEmbed() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <iframe
      data-tally-src="https://tally.so/embed/m6xjyO?dynamicHeight=1"
      width="100%"
      height="577"
      style={{ border: "none", margin: 0 }}
      title="Waitlist Form"
    ></iframe>
  );
}
