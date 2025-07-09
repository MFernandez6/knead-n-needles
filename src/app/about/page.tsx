"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-24 pb-16 bg-gradient-to-r from-amber-600 to-amber-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            <div className="relative w-48 h-24">
              <Image
                src="/logo-SVG.svg"
                alt="Needle & Knead Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="text-center">
            <h1 className="heading-responsive font-bold text-white mb-6 animate-fade-in-up">
              About{" "}
              <span className="text-gradient bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
                Me
              </span>
            </h1>
            <p
              className="text-responsive text-amber-100 max-w-3xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Your journey to wellness begins with understanding the passion and
              expertise behind every session
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative animate-fade-in-up">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/about-me.jpg"
                  alt="Professional massage therapist"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-500 rounded-full opacity-20 floating"></div>
            </div>

            {/* Content */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Your Wellness Journey Starts Here
              </h2>

              <div className="space-y-6 text-gray-700">
                <p className="text-lg leading-relaxed">
                  Welcome to Needle & Knead, where your wellness journey begins
                  with personalized care and professional expertise. I&apos;m
                  dedicated to providing you with the highest quality massage
                  therapy services in the comfort of your own home.
                </p>

                <p className="text-lg leading-relaxed">
                  With years of experience and specialized training in various
                  massage techniques, I understand that every client is unique.
                  That&apos;s why each session is tailored to your specific
                  needs, whether you&apos;re seeking relaxation, pain relief, or
                  enhanced athletic performance.
                </p>

                <p className="text-lg leading-relaxed">
                  My approach combines traditional massage therapy with modern
                  wellness techniques, ensuring you receive a comprehensive
                  treatment that addresses both your physical and mental
                  well-being. From Swedish massage for relaxation to deep tissue
                  therapy for chronic pain, I&apos;m here to help you achieve
                  optimal wellness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-responsive font-bold text-gray-900 mb-6">
              My <span className="text-gradient">Commitment</span> to You
            </h2>
            <p className="text-responsive text-gray-600 max-w-3xl mx-auto">
              Every session is built on these core principles that guide my
              practice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "Personalized Care",
                description:
                  "Every session is customized to your specific needs and preferences, ensuring you receive the most effective treatment possible.",
              },
              {
                icon: "🏠",
                title: "Convenient Service",
                description:
                  "I bring professional massage therapy directly to your home, eliminating travel time and creating a comfortable, familiar environment.",
              },
              {
                icon: "✨",
                title: "Professional Excellence",
                description:
                  "With extensive training and experience, I maintain the highest standards of professional care and technique.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="card p-8 text-center group hover:shadow-strong animate-fade-in-up"
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="animate-fade-in-up">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Experience & Expertise
              </h2>

              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-soft">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Professional Training
                  </h3>
                  <p className="text-gray-700">
                    Certified in multiple massage therapy techniques including
                    Swedish, Deep Tissue, Sports Massage, and specialized
                    treatments like TMJ therapy and reflexology.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-soft">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Continuing Education
                  </h3>
                  <p className="text-gray-700">
                    Committed to ongoing professional development, staying
                    current with the latest techniques and wellness approaches
                    to provide you with the best possible care.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-soft">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Client-Centered Approach
                  </h3>
                  <p className="text-gray-700">
                    Every session begins with a thorough consultation to
                    understand your specific needs, ensuring a personalized
                    experience that addresses your unique wellness goals.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: "500+", label: "Sessions Completed" },
                  { number: "5+", label: "Years Experience" },
                  { number: "100%", label: "Client Satisfaction" },
                  { number: "24/7", label: "Flexible Scheduling" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 text-center shadow-medium hover:shadow-strong transition-all duration-300"
                  >
                    <div className="text-3xl font-bold text-amber-700 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-amber-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="heading-responsive font-bold text-white mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-responsive text-amber-100 mb-8">
            Book your first session today and discover how personalized massage
            therapy can transform your wellness journey
          </p>
          <Link
            href="/services"
            className="inline-block bg-white text-amber-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Book Your Session
          </Link>
        </div>
      </section>
    </div>
  );
}
