"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with sophisticated overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-image.JPG"
            alt="Massage therapy background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-amber-900/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-amber-500/20 rounded-full blur-2xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-32 h-32 bg-amber-300/20 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-amber-400/15 rounded-full blur-xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-responsive-4xl font-bold mb-8 leading-tight">
              <span className="gradient-text-light block mb-2">
                Transform Your Wellness
              </span>
              <span className="text-white">with Expert Massage Therapy</span>
            </h1>

            <p className="text-responsive-lg text-amber-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience the perfect blend of traditional techniques and modern
              wellness approaches. Your journey to relaxation and rejuvenation
              starts here.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/services"
                className="btn-primary text-responsive-lg px-10 py-4 animate-pulse-glow"
              >
                Explore Services
              </Link>
              <Link
                href="/about"
                className="btn-secondary text-responsive-lg px-10 py-4"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white via-amber-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-responsive-3xl font-bold text-gray-900 mb-6">
              Why Choose <span className="gradient-text">Needle & Knead</span>?
            </h2>
            <p className="text-responsive-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the difference with our personalized approach to
              massage therapy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🌟",
                title: "Personalized Care",
                description:
                  "Every session is tailored to your specific needs and preferences, ensuring a truly customized experience.",
              },
              {
                icon: "🏠",
                title: "Mobile Service",
                description:
                  "We come to you - enjoy professional massage in the comfort of your home, creating the perfect environment for relaxation.",
              },
              {
                icon: "✨",
                title: "Expert Techniques",
                description:
                  "Combining traditional methods with modern wellness approaches for optimal results and lasting benefits.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="card-elevated group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-responsive-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-responsive-3xl font-bold text-gray-900 mb-6">
              Our Signature <span className="gradient-text">Services</span>
            </h2>
            <p className="text-responsive-lg text-gray-600 max-w-3xl mx-auto">
              Discover our range of therapeutic massage techniques designed to
              promote wellness and relaxation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Swedish Massage",
                duration: "60-90 min",
                price: "$120-180",
                description:
                  "Classic relaxation massage using long strokes and kneading techniques.",
              },
              {
                name: "Deep Tissue",
                duration: "60-90 min",
                price: "$120-180",
                description:
                  "Targeted therapy for chronic muscle tension and deep-seated issues.",
              },
              {
                name: "Sports Massage",
                duration: "60-90 min",
                price: "$120-180",
                description:
                  "Specialized treatment for athletes and active individuals.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="card group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-amber-700 transition-colors">
                    {service.name}
                  </h3>
                  <span className="text-amber-600 font-semibold">
                    {service.price}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {service.duration}
                  </span>
                  <span className="text-amber-600 text-sm font-medium">
                    Learn More →
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="btn-primary text-responsive-lg px-8 py-4"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-amber-600/20 to-transparent"></div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-amber-300/20 rounded-full blur-2xl animate-float"></div>
        <div
          className="absolute bottom-10 left-10 w-24 h-24 bg-amber-400/20 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-responsive-3xl font-bold text-white mb-8">
            Ready to Experience True Relaxation?
          </h2>
          <p className="text-responsive-lg text-amber-100 mb-12 leading-relaxed">
            Contact us today to schedule your personalized massage session.
            Experience the convenience of mobile massage therapy in the comfort
            of your home.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-amber-700 px-10 py-4 rounded-lg font-semibold text-responsive-lg hover:bg-amber-50 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl animate-pulse-glow"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
