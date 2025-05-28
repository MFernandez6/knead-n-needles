"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import BookingModal from "@/components/BookingModal";
import AddOnsModal from "@/components/AddOnsModal";

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
  addOns: [
    {
      id: "cupping",
      name: "Cupping",
      price: 20,
      description:
        "Traditional therapy using suction cups to improve blood flow and relieve muscle tension.",
    },
    {
      id: "hot-stones",
      name: "Hot Stones",
      price: 20,
      description:
        "Heated stones placed on key points to deeply relax muscles and improve circulation.",
    },
    {
      id: "chirp-halo",
      name: "Chirp Halo Muscle Stim",
      price: 30,
      description:
        "Advanced muscle stimulation therapy using the Chirp Halo device for targeted pain relief.",
    },
    {
      id: "hypervolt",
      name: "Hypervolt",
      price: 15,
      description:
        "Percussion therapy using the Hypervolt device to reduce muscle soreness and improve recovery.",
    },
    {
      id: "cbd",
      name: "CBD Oil and Cream",
      price: 10,
      description:
        "Premium CBD products applied topically to enhance relaxation and reduce inflammation.",
    },
    {
      id: "singing-bowls",
      name: "Singing Bowls",
      price: 15,
      description:
        "Tibetan singing bowls create therapeutic vibrations that promote deep relaxation and healing.",
    },
    {
      id: "salt-scrub",
      name: "Salt Scrub",
      price: 30,
      description:
        "Exfoliating treatment using natural salts to rejuvenate skin and improve circulation.",
    },
  ],
};

export default function Home() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAddOnsModalOpen, setIsAddOnsModalOpen] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);

  const handleEditAddOns = () => {
    setIsBookingModalOpen(false);
    setIsAddOnsModalOpen(true);
  };

  const handleAddOnsSelected = (addOns: AddOn[]) => {
    setSelectedAddOns(addOns);
  };

  const handleAddOnsContinue = (addOns: AddOn[]) => {
    setSelectedAddOns(addOns);
    setIsAddOnsModalOpen(false);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-image.JPG"
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
            onClick={() => {
              setSelectedAddOns([]);
              setIsBookingModalOpen(true);
            }}
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
                <p className="text-amber-700 font-medium mb-2">
                  The Tranquilizer
                </p>
                <p className="text-gray-600 mb-4">
                  The Monday blues recovery, the mid week sedative and finally
                  the &apos;it&apos;s Friday, I made it!&apos; This treatment
                  uses a light to medium pressure massage focused to relieve
                  both the mental and physical aspects of the body.
                </p>
                <Link
                  href="/services/swedish"
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
                <p className="text-amber-700 font-medium mb-2">The Bulldozer</p>
                <p className="text-gray-600 mb-4">
                  Don&apos;t let the name scare you, a skilled massage therapist
                  can get into those sore muscles WITHOUT making you feel like
                  you just finished a marathon. Using firm pressure we pinpoint
                  exactly where it is affecting you.
                </p>
                <Link
                  href="/services/deep-tissue"
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
                <p className="text-amber-700 font-medium mb-2">
                  The Performance Enhancer
                </p>
                <p className="text-gray-600 mb-4">
                  Whether you&apos;re a weekend warrior or a professional
                  athlete, this is your secret weapon! Think of it as a tune-up
                  for your body&apos;s engine. We&apos;ll get those muscles
                  firing on all cylinders.
                </p>
                <Link
                  href="/services/sports"
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
                <div className="absolute top-4 right-4 bg-amber-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Coming Soon
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Acupuncture Therapy
                </h3>
                <p className="text-amber-700 font-medium mb-2">Coming Soon</p>
                <p className="text-gray-600 mb-4">
                  Traditional Chinese medicine technique that involves inserting
                  thin needles into specific points on the body to treat pain
                  and various conditions.
                </p>
                <Link
                  href="/services/acupuncture"
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
                  alt="Reflexology"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Reflexology</h3>
                <p className="text-amber-700 font-medium mb-2">
                  The Foot Whisperer
                </p>
                <p className="text-gray-600 mb-4">
                  Who knew your feet held the map to your body&apos;s wellness?
                  It&apos;s like having a remote control for your entire system!
                  Through gentle to firm pressure on specific points, we can
                  help your body find its natural balance.
                </p>
                <Link
                  href="/services/reflexology"
                  className="text-amber-700 hover:text-amber-800 font-medium"
                >
                  Learn More →
                </Link>
              </div>
            </div>

            {/* TMJ */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm transition-transform duration-300 hover:scale-105">
              <div className="relative h-48">
                <Image
                  src="/images/tmj.jpg"
                  alt="TMJ Massage"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">TMJ</h3>
                <p className="text-amber-700 font-medium mb-2">
                  Please, don&apos;t bite my finger off
                </p>
                <p className="text-gray-600 mb-4">
                  A specialized type of massage focusing on the muscles and
                  tissues surrounding the temporomandibular joint, anterior part
                  of the neck, occipital area of the neck, shoulders and back.
                </p>
                <Link
                  href="/services/tmj"
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
          <h2 className="text-3xl font-bold mb-6 text-center">
            Why Choose Needle & Knead
          </h2>
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

      {/* Modals */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedAddOns={selectedAddOns}
        onEditAddOns={handleEditAddOns}
      />

      <AddOnsModal
        isOpen={isAddOnsModalOpen}
        onClose={() => setIsAddOnsModalOpen(false)}
        addOns={defaultService.addOns}
        onAddOnsSelected={handleAddOnsSelected}
        onContinue={handleAddOnsContinue}
      />
    </div>
  );
}
