import React from "react";
import Hero from "../components/Hero";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";
import About from "@/components/About";
import CreateCase from "@/components/CreateCase";

function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Features />
      <CreateCase />
      <FAQ />
    </div>
  );
}

export default Home;
