import Benefits from "@/components/Benefits";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import TechShowcase from "@/components/TechShowcase";
import Testimonials from "@/components/Testimonials";
import Header from "@/components/header";
import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Benefits />
      <TechShowcase />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
