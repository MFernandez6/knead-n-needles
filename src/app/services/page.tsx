"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BookingModal from "@/components/BookingModal";
import AddOnsModal from "@/components/AddOnsModal";
import Navbar from "@/components/Navbar";

interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
}

const AVAILABLE_ADD_ONS: AddOn[] = [
  {
    id: "hot-stone",
    name: "Hot Stone Therapy",
    price: 30,
    description:
      "Warm basalt stones are placed on key points of your body to promote deep relaxation and muscle tension relief.",
  },
  {
    id: "aromatherapy",
    name: "Aromatherapy",
    price: 20,
    description:
      "Essential oils are used to enhance your massage experience and promote emotional wellness.",
  },
  {
    id: "cupping",
    name: "Cupping Therapy",
    price: 25,
    description:
      "Specialized cups create suction to help release muscle tension and improve blood flow.",
  },
  {
    id: "acupuncture",
    name: "Acupuncture",
    price: 40,
    description:
      "Fine needles are strategically placed to promote natural wellness and balance energy flow.",
  },
  {
    id: "chirp-halo",
    name: "Chirp Halo Muscle Stim",
    price: 35,
    description:
      "Advanced muscle stimulation technology to enhance recovery and reduce muscle tension.",
  },
  {
    id: "hypervolt",
    name: "Hypervolt",
    price: 30,
    description:
      "Percussive therapy device that helps break up muscle knots and improve circulation.",
  },
  {
    id: "cbd-oil",
    name: "CBD Oil and Cream",
    price: 25,
    description:
      "Premium CBD products applied during your session to enhance relaxation and promote natural wellness.",
  },
  {
    id: "singing-bowls",
    name: "Singing Bowls",
    price: 20,
    description:
      "Therapeutic sound therapy using Tibetan singing bowls to promote deep relaxation and stress relief.",
  },
  {
    id: "salt-scrub",
    name: "Salt Scrub",
    price: 25,
    description:
      "Exfoliating salt scrub treatment to rejuvenate skin and enhance your massage experience.",
  },
];

const services = [
  {
    id: "swedish",
    title: "Swedish Massage",
    subtitle: "The Tranquilizer",
    image: "/images/swedish.jpg",
    description:
      "The Monday blues recovery, the mid week sedative and finally the 'it's Friday, I made it!' This treatment uses a light to medium pressure massage focused to relieve both the mental and physical aspects of the body.",
    benefits: [
      "Reduces stress",
      "Improves circulation",
      "Relieves muscle tension",
    ],
    duration: "60 minutes",
    price: {
      "60": 120,
      "90": 180,
    },
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
  },
  {
    id: "deep-tissue",
    title: "Deep Tissue",
    subtitle: "The Bulldozer",
    image: "/images/deep-tissue.jpg",
    description:
      "Don't let the name scare you, a skilled massage therapist can get into those sore muscles WITHOUT making you feel like you just finished a marathon. Using firm pressure we pinpoint exactly where it is affecting you.",
    benefits: [
      "Targets deep muscle tension",
      "Improves range of motion",
      "Reduces chronic pain",
    ],
    duration: "60 minutes",
    price: {
      "60": 120,
      "90": 180,
    },
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
  },
  {
    id: "sports",
    title: "Sports Massage",
    subtitle: "The Performance Enhancer",
    image: "/images/sports.webp",
    description:
      "Whether you're a weekend warrior or a professional athlete, this is your secret weapon! Think of it as a tune-up for your body's engine. We'll get those muscles firing on all cylinders.",
    benefits: [
      "Enhances athletic performance",
      "Reduces muscle soreness",
      "Improves flexibility",
    ],
    duration: "60 minutes",
    price: {
      "60": 120,
      "90": 180,
    },
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
  },
  {
    id: "acupuncture",
    title: "Acupuncture Therapy",
    subtitle: "Coming Soon",
    image: "/images/acupuncture.jpg",
    description:
      "Traditional Chinese medicine technique that involves inserting thin needles into specific points on the body to treat pain and various conditions.",
    benefits: ["Pain relief", "Stress reduction", "Improved energy flow"],
    duration: "60 minutes",
    price: {
      "60": 120,
      "90": 180,
    },
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
  },
  {
    id: "reflexology",
    title: "Reflexology",
    subtitle: "The Foot Whisperer",
    image: "/images/reflexology.jpeg",
    description:
      "Who knew your feet held the map to your body's wellness? It's like having a remote control for your entire system! Through gentle to firm pressure on specific points, we can help your body find its natural balance.",
    benefits: [
      "Improves circulation",
      "Reduces stress",
      "Promotes natural healing",
    ],
    duration: "60 minutes",
    price: {
      "60": 120,
      "90": 180,
    },
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
  },
  {
    id: "tmj",
    title: "TMJ",
    subtitle: "Please, don't bite my finger off",
    image: "/images/tmj.jpg",
    description:
      "A specialized type of massage focusing on the muscles and tissues surrounding the temporomandibular joint, anterior part of the neck, occipital area of the neck, shoulders and back.",
    benefits: [
      "Relieves jaw tension",
      "Reduces headaches",
      "Improves jaw mobility",
    ],
    duration: "60 minutes",
    price: {
      "60": 120,
      "90": 180,
    },
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
  },
];

export default function ServicesPage() {
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
              Our{" "}
              <span className="text-gradient bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            <p
              className="text-responsive text-amber-100 max-w-3xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Discover our range of professional massage therapy services
              designed to enhance your wellness journey
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="card group overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {service.id === "acupuncture" && (
                    <div className="absolute top-4 right-4 bg-amber-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Coming Soon
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-amber-700 font-medium mb-4 italic">
                    {service.subtitle}
                  </p>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {service.description}
                  </p>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Duration:
                      </span>
                      <span className="text-sm text-gray-600">
                        {service.duration}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Starting at:
                      </span>
                      <span className="text-lg font-bold text-amber-700">
                        $
                        {typeof service.price === "object"
                          ? service.price["60"]
                          : service.price}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      href={`/services/${service.id}`}
                      className="flex-1 text-center bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-800 transition-colors"
                    >
                      Learn More
                    </Link>
                    <button
                      onClick={() => {
                        setSelectedAddOns([]);
                        setIsBookingModalOpen(true);
                      }}
                      className="flex-1 text-center bg-white text-amber-700 border border-amber-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-50 transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="heading-responsive font-bold text-white mb-6">
            Ready to Experience True Relaxation?
          </h2>
          <p className="text-responsive text-amber-100 mb-8">
            Book your appointment today and take the first step towards better
            wellness
          </p>
          <button
            onClick={() => {
              setSelectedAddOns([]);
              setIsBookingModalOpen(true);
            }}
            className="inline-block bg-white text-amber-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Book Your Appointment
          </button>
        </div>
      </section>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedAddOns={selectedAddOns}
        onEditAddOns={handleEditAddOns}
      />

      <AddOnsModal
        isOpen={isAddOnsModalOpen}
        onClose={() => setIsAddOnsModalOpen(false)}
        addOns={AVAILABLE_ADD_ONS}
        onAddOnsSelected={handleAddOnsSelected}
        onContinue={handleAddOnsContinue}
      />
    </div>
  );
}
