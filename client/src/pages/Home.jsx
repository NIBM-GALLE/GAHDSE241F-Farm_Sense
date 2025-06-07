import React from "react";
import Hero from "../components/Hero";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";
import About from "@/components/About";
import CreateCase from "@/components/CreateCaseSection";
import CreateCaseSection from "@/components/CreateCaseSection";

function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Features />
      <CreateCaseSection />
      <FAQ />
    </div>
  );
}

export default Home;
