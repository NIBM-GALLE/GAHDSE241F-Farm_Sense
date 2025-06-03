import React from "react";

const contactImage =
  "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=600&q=80";

function Contact() {
  return (
    <div className="flex flex-col min-h-screen ">
      <main className="flex-1 flex items-center justify-center mt-8">
        <section className="bg-card dark:bg-gray-800 rounded-xl shadow-md p-8 flex flex-col items-center max-w-2xl w-full mx-auto px-4">
          <img
            src={contactImage}
            alt="Contact Team"
            className="w-32 h-32 rounded-full object-cover shadow-lg mb-6 border-4 border-primary/30"
          />
          <h1 className="text-3xl font-bold text-primary mb-4 font-poppins text-center">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground mb-8 text-center font-poppins">
            Have questions or need support? Reach out to the FarmSense team!
          </p>
          <form className="space-y-6 w-full">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1 font-poppins">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-background dark:bg-gray-900 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1 font-poppins">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-background dark:bg-gray-900 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="you@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1 font-poppins">
                Message
              </label>
              <textarea
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-background dark:bg-gray-900 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                rows={5}
                placeholder="How can we help you?"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white dark:text-black font-semibold py-2 rounded-lg shadow hover:bg-primary/90 transition-colors font-poppins"
            >
              Send Message
            </button>
          </form>
          <div className="mt-8 text-center text-muted-foreground text-sm font-poppins">
            Or email us directly at{" "}
            <a
              href="mailto:help@Farmsense.com"
              className="text-primary underline"
            >
              help@Farmsense.com
            </a>
            <br />
            Galle Road, Colombo 03
          </div>
        </section>
      </main>
    </div>
  );
}

export default Contact;
