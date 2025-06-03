import React from "react";
const farmerImage =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80";
const mlImage =
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80";
const teamworkImage =
  "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=400&q=80";

function AboutUs() {
  return (
    <div className=" min-h-screen py-8">
      <main className="max-w-5xl mx-auto px-4">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <div className="inline-block bg-primary/10 px-6 py-2 rounded-full mb-4">
            <span className="text-primary font-semibold tracking-wide text-sm font-poppins">
              About FarmSense
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Empowering Sri Lankan Farmers with Smart Disease Detection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-poppins">
            FarmSense is a technology-driven solution created to address crop
            disease challenges in Sri Lanka. Using machine learning and
            real-time data, the system helps farmers detect diseases early and
            take action faster.
          </p>
        </section>

        {/* Image and Mission Section */}
        <section className="mb-16 flex flex-col md:flex-row items-center gap-8 bg-card dark:bg-gray-800 rounded-xl shadow-md p-6">
          <img
            src={farmerImage}
            alt="Farmer with crops"
            className="w-full md:w-1/2 rounded-lg shadow-lg object-cover"
          />
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold text-foreground mb-3 font-poppins">
              Our Mission
            </h2>
            <p className="text-base text-muted-foreground font-poppins">
              Our mission is to reduce crop losses and improve farming
              productivity in Sri Lanka through innovative technologies.
              FarmSense bridges the gap between farmers, field agents, and
              researchers with a centralized system that promotes faster
              diagnosis and accurate treatments.
            </p>
          </div>
        </section>

        {/* ML and Hierarchical System */}
        <section className="mb-16 flex flex-col md:flex-row-reverse items-center gap-8 bg-card dark:bg-gray-800 rounded-xl shadow-md p-6">
          <img
            src={mlImage}
            alt="ML Analysis"
            className="w-full md:w-1/2 rounded-lg shadow-lg object-cover"
          />
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold text-foreground mb-3 font-poppins">
              Smart Detection with ML
            </h2>
            <p className="text-base text-muted-foreground font-poppins">
              Our platform uses convolutional neural networks to analyze images
              of diseased crops. Farmers upload photos, and the ML model
              provides a diagnosis and treatment recommendation, reducing
              reliance on guesswork.
            </p>
          </div>
        </section>

        {/* Team and Collaboration Section */}
        <section className="mb-16 flex flex-col md:flex-row items-center gap-8 bg-card dark:bg-gray-800 rounded-xl shadow-md p-6">
          <img
            src={teamworkImage}
            alt="Team collaboration"
            className="w-full md:w-1/2 rounded-lg shadow-lg object-cover"
          />
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold text-foreground mb-3 font-poppins">
              Designed for Collaboration
            </h2>
            <p className="text-base text-muted-foreground font-poppins">
              FarmSense connects farmers, sub-center administrators, visit
              agents, and research divisions in a streamlined workflow. Each
              role is empowered with tools to report, analyze, and respond to
              issues quickly, improving national agricultural resilience.
            </p>
          </div>
        </section>

        {/* Vision Section */}
        <section className="text-center mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-3 font-poppins">
            Our Vision
          </h2>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto font-poppins">
            We envision a future where every farmer in Sri Lanka can access
            real-time support, scientific knowledge, and accurate diagnosis
            tools regardless of their location. Through FarmSense, we aim to
            create a more connected and sustainable agricultural system.
          </p>
        </section>

        {/* System Features Summary */}
        <section className="text-center bg-card dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-foreground mb-3 font-poppins">
            Key Features
          </h2>
          <ul className="list-disc list-inside text-base text-muted-foreground max-w-xl mx-auto font-poppins space-y-1 text-left md:text-center">
            <li>ML-based crop disease detection from images</li>
            <li>Hierarchical task assignment system</li>
            <li>Centralized disease and research database</li>
            <li>Real-time notifications via SMS and email</li>
            <li>Mobile and web access for all users</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default AboutUs;
