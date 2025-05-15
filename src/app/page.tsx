"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import BookingModal from "@/components/BookingModal";

interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
}

// Define a default service for the home page booking
const defaultService = {
  id: "general",
  title: "General Massage",
  subtitle: "Relaxation and Wellness",
  image: "/images/general-massage.jpg",
  description:
    "A full-body massage designed to promote relaxation and reduce stress.",
  benefits: [
    "Reduces stress",
    "Improves circulation",
    "Relieves muscle tension",
  ],
  duration: "60 minutes",
  price: "80",
  addOns: [],
};

export default function Home() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const selectedAddOns: AddOn[] = [];

  const handleEditAddOns = () => {
    // Redirect to services page for add-on selection
    window.location.href = "/services";
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-image.jpg"
            alt="Relaxing massage therapy"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Experience True Relaxation
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Professional massage therapy services to help you unwind and
            rejuvenate
          </p>
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="bg-amber-700 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-amber-800 transition-colors"
          >
            Book Your Session
          </button>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Swedish Massage */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm transition-transform duration-300 hover:scale-105">
              <div className="relative h-48">
                <Image
                  src="/images/swedish.jpg"
                  alt="Swedish Massage"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Swedish Massage</h3>
                <p className="text-gray-600 mb-4">
                  A gentle, relaxing massage that promotes overall wellness and
                  stress relief.
                </p>
                <Link
                  href={`/services?service=swedish`}
                  className="text-amber-700 hover:text-amber-800 font-medium"
                >
                  Learn More →
                </Link>
              </div>
            </div>

            {/* Deep Tissue */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm transition-transform duration-300 hover:scale-105">
              <div className="relative h-48">
                <Image
                  src="/images/deep-tissue.jpg"
                  alt="Deep Tissue Massage"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Deep Tissue</h3>
                <p className="text-gray-600 mb-4">
                  Targeted pressure to release chronic muscle tension and
                  improve mobility.
                </p>
                <Link
                  href={`/services?service=deep-tissue`}
                  className="text-amber-700 hover:text-amber-800 font-medium"
                >
                  Learn More →
                </Link>
              </div>
            </div>

            {/* Sports Massage */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm transition-transform duration-300 hover:scale-105">
              <div className="relative h-48">
                <Image
                  src="/images/sports.webp"
                  alt="Sports Massage"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Sports Massage</h3>
                <p className="text-gray-600 mb-4">
                  Specialized massage for athletes to enhance performance and
                  recovery.
                </p>
                <Link
                  href={`/services?service=sports`}
                  className="text-amber-700 hover:text-amber-800 font-medium"
                >
                  Learn More →
                </Link>
              </div>
            </div>

            {/* Acupuncture */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm transition-transform duration-300 hover:scale-105">
              <div className="relative h-48">
                <Image
                  src="/images/acupuncture.jpg"
                  alt="Acupuncture Therapy"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Acupuncture Therapy
                </h3>
                <p className="text-gray-600 mb-4">
                  Traditional Chinese medicine technique that involves inserting
                  thin needles into specific points on the body to treat pain
                  and various conditions
                </p>
                <Link
                  href={`/services?service=acupuncture`}
                  className="text-amber-700 hover:text-amber-800 font-medium"
                >
                  Learn More →
                </Link>
              </div>
            </div>

            {/* Cupping */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm transition-transform duration-300 hover:scale-105">
              <div className="relative h-48">
                <Image
                  src="/images/cupping.jpg"
                  alt="cupping"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Cupping Therapy</h3>
                <p className="text-gray-600 mb-4">
                  An alternative medicine practice where cups are placed on the
                  skin to create suction, potentially relieving pain and
                  promoting healing.
                </p>
                <Link
                  href={`/services?service=cupping`}
                  className="text-amber-700 hover:text-amber-800 font-medium"
                >
                  Learn More →
                </Link>
              </div>
            </div>

            {/* Reflexology */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm transition-transform duration-300 hover:scale-105">
              <div className="relative h-48">
                <Image
                  src="/images/reflexology.jpeg"
                  alt="reflexology"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Reflexology</h3>
                <p className="text-gray-600 mb-4">
                  Reflexology uses gentle to firm pressure on different pressure
                  points of the feet, hands, and ears.
                </p>
                <Link
                  href={`/services?service=reflexology`}
                  className="text-amber-700 hover:text-amber-800 font-medium"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">Why Choose Needle & Knead</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-amber-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Therapists</h3>
              <p className="text-gray-600">
                Our licensed therapists have years of experience and specialized
                training.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-amber-700"
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
              <h3 className="text-xl font-semibold mb-2">Convenient Hours</h3>
              <p className="text-gray-600">
                Extended hours to accommodate your busy schedule.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-amber-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Experience</h3>
              <p className="text-gray-600">
                Luxurious facilities and premium products for your comfort.
              </p>
            </div>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        service={defaultService}
        selectedAddOns={selectedAddOns}
        onEditAddOns={handleEditAddOns}
      />
    </div>
  );
}
