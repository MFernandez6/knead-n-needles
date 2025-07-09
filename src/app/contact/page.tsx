"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function ContactPage() {
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
              Get in{" "}
              <span className="text-gradient bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p
              className="text-responsive text-amber-100 max-w-3xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Ready to start your wellness journey? I&apos;m here to answer your
              questions and help you book your perfect session
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div className="animate-fade-in-up">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Let&apos;s Connect
              </h2>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-amber-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Email
                    </h3>
                    <p className="text-gray-600 mb-1">
                      needleandkneadservices@gmail.com
                    </p>
                    <p className="text-sm text-gray-500">
                      I&apos;ll respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-amber-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Response Time
                    </h3>
                    <p className="text-gray-600 mb-1">Within 24 hours</p>
                    <p className="text-sm text-gray-500">
                      Usually much faster during business hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-amber-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Service Area
                    </h3>
                    <p className="text-gray-600 mb-1">
                      Mobile service - I come to you!
                    </p>
                    <p className="text-sm text-gray-500">
                      Available throughout the local area
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-12 space-y-4">
                <Link
                  href="/services"
                  className="block w-full bg-amber-700 text-white px-6 py-4 rounded-lg text-center font-semibold hover:bg-amber-800 transition-colors duration-300 transform hover:scale-105"
                >
                  View Services
                </Link>
                <button
                  onClick={() => {
                    // This would typically open the booking modal
                    window.location.href = "/services";
                  }}
                  className="block w-full bg-white text-amber-700 border-2 border-amber-700 px-6 py-4 rounded-lg text-center font-semibold hover:bg-amber-50 transition-colors duration-300 transform hover:scale-105"
                >
                  Book Appointment
                </button>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Send a Message
                </h3>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="input-field"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="input-field"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="input-field"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="input-field"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select className="input-field">
                      <option value="">Select a topic</option>
                      <option value="booking">Booking Inquiry</option>
                      <option value="services">Services Information</option>
                      <option value="pricing">Pricing Questions</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      className="input-field resize-none"
                      placeholder="Tell me how I can help you..."
                    ></textarea>
                  </div>

                  <button type="submit" className="w-full btn-primary">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-responsive font-bold text-gray-900 mb-6">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-responsive text-gray-600">
              Common questions about my services and booking process
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "What areas do you serve?",
                answer:
                  "I provide mobile massage therapy services throughout the local area. Contact me to confirm availability in your specific location.",
              },
              {
                question: "How far in advance should I book?",
                answer:
                  "I recommend booking at least 24-48 hours in advance to ensure availability, though I do my best to accommodate last-minute requests when possible.",
              },
              {
                question: "What should I prepare for my session?",
                answer:
                  "I&apos;ll bring everything needed for your massage, including the table, linens, and oils. Just provide a quiet, comfortable space in your home.",
              },
              {
                question: "Do you offer gift certificates?",
                answer:
                  "Yes! Gift certificates are available and make perfect gifts for friends and family. Contact me for more details.",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "I accept cash, credit cards, and digital payments. Payment is collected at the time of service.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="card p-6 animate-fade-in-up"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-amber-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="heading-responsive font-bold text-white mb-6">
            Ready to Start Your Wellness Journey?
          </h2>
          <p className="text-responsive text-amber-100 mb-8">
            Don&apos;t wait to experience the benefits of professional massage
            therapy. Book your session today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services"
              className="inline-block bg-white text-amber-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View Services
            </Link>
            <button
              onClick={() => {
                window.location.href = "/services";
              }}
              className="inline-block bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-amber-700 transform hover:scale-105 transition-all duration-300"
            >
              Book Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
