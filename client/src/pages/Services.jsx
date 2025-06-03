import React from "react";

const serviceImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", // 24/7 Support
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80", // Farmer Training
  "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=400&q=80", // Feedback and Reporting
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80", // Personalized Advisory
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80", // Support Center
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80", // Knowledge Hub
];

const services = [
  {
    title: "24/7 Customer Support",
    desc: "Our dedicated help desk is always online to assist with technical issues, user guidance, and troubleshooting crop disease reports.",
    img: serviceImages[0],
  },
  {
    title: "Farmer Training Programs",
    desc: "We conduct regular training on how to use the app, submit images, and interpret diagnosis and recommendations effectively.",
    img: serviceImages[1],
  },
  {
    title: "Feedback & Reporting",
    desc: "Users can easily send feedback or report bugs within the app. Our team ensures issues are resolved quickly and transparently.",
    img: serviceImages[2],
  },
  {
    title: "Personalized Advisory",
    desc: "Receive crop-specific tips and treatment updates tailored to your location and previous disease reports.",
    img: serviceImages[3],
  },
  {
    title: "Regional Support Centers",
    desc: "Farmers can visit nearby centers for in-person assistance, hands-on help, and direct access to agricultural officers.",
    img: serviceImages[4],
  },
  {
    title: "Digital Knowledge Hub",
    desc: "Access guides, FAQs, tutorials, and research updates through our easy-to-navigate knowledge base built for the farming community.",
    img: serviceImages[5],
  },
];

function Services() {
  return (
    <div className="min-h-screen py-12 ">
      <main className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <section className="text-center mb-16">
          <div className="inline-block bg-primary/10 px-6 py-2 rounded-full mb-4">
            <span className="text-primary font-semibold tracking-wide text-sm font-poppins">
              Customer Services
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-poppins">
            Support That Strengthens Farming
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-4 font-poppins">
            FarmSense not only predicts and monitors crop diseases but also
            provides robust customer support to ensure farmers have the help
            they need, when they need it.
          </p>
        </section>

        {/* Service Cards */}
        <section className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <div
              key={service.title}
              className="bg-card dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center hover:shadow-2xl transition group border border-gray-100 dark:border-gray-700"
            >
              <div className="w-24 h-24 mb-6 rounded-full overflow-hidden border-4 border-primary/30 shadow-lg group-hover:scale-105 transition-transform">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 font-poppins text-center group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-base text-muted-foreground font-poppins text-center">
                {service.desc}
              </p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Services;
