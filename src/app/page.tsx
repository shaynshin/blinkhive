import Benefits from "@/components/landing/Benefits";
import CTA from "@/components/landing/CTA";
import FAQ from "@/components/landing/FAQ";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/header/Header";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Products from "@/components/landing/products/Products";
import TechShowcase from "@/components/landing/TechShowcase";
import Testimonials from "@/components/landing/Testimonials";
import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Products />
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
