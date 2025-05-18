/* eslint-disable react/no-unescaped-entities */
"use client";

import { useParams } from "next/navigation";
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

interface Service {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  benefits: string[];
  duration: string;
  price: string;
  addOns?: AddOn[];
  comingSoon?: boolean;
}

const SERVICES: Service[] = [
  {
    id: "swedish",
    title: "Swedish Massage",
    subtitle: "The Tranquilizer",
    image: "/images/swedish.jpg",
    description:
      "A full-body massage designed to promote relaxation and reduce stress.",
    benefits: [
      "Reduces stress",
      "Improves circulation",
      "Relieves muscle tension",
    ],
    duration: "60-90 minutes",
    price: "100",
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
      "A therapeutic massage that targets deep muscle layers to relieve chronic tension.",
    benefits: [
      "Relieves chronic pain",
      "Improves posture",
      "Increases range of motion",
    ],
    duration: "60-90 minutes",
    price: "100",
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
      "Specialized massage for athletes to improve performance and prevent injuries.",
    benefits: [
      "Prevents injuries",
      "Improves athletic performance",
      "Speeds up recovery time",
    ],
    duration: "60-90 minutes",
    price: "100",
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
      "Foot massage that stimulates pressure points to improve overall health.",
    benefits: ["Stress reduction", "Improved circulation", "Better sleep"],
    duration: "30 minutes",
    price: "40",
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
    subtitle: "Please, don&apos;t bite my finger off",
    image: "/images/tmj.jpg",
    description:
      "A specialized type of massage focusing on the muscles and tissues surrounding the temporomandibular joint, anterior part of the neck, occipital area of the neck, shoulders and back.",
    benefits: [
      "Relieves jaw tension",
      "Improves jaw mobility",
      "Reduces TMJ pain",
    ],
    duration: "60 minutes",
    price: "100",
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

export default function ServicePage() {
  const params = useParams();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAddOnsModalOpen, setIsAddOnsModalOpen] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);

  const serviceId = params.serviceId as string;
  const service = SERVICES.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Service Not Found
          </h1>
          <p className="text-gray-600">
            The service you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {service.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8">{service.subtitle}</p>
          <button
            onClick={() => {
              setSelectedAddOns([]);
              setIsBookingModalOpen(true);
            }}
            className="bg-amber-700 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-amber-800 transition-colors"
          >
            Book Your Appointment
          </button>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">About This Service</h2>
              <p className="text-gray-600 text-lg mb-8">
                {service.description}
              </p>

              <h3 className="text-2xl font-semibold mb-4">Benefits</h3>
              <ul className="space-y-2">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-6 w-6 text-amber-700 mr-2"
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
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-2xl font-semibold mb-4">Service Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{service.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Price</span>
                    <span className="text-amber-700 font-medium">
                      ${service.price}
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-4">
                    Available Add-Ons
                  </h4>
                  <div className="space-y-4">
                    {service.addOns?.map((addOn) => (
                      <div
                        key={addOn.id}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <h5 className="font-medium">{addOn.name}</h5>
                          <p className="text-sm text-gray-600">
                            {addOn.description}
                          </p>
                        </div>
                        <span className="text-amber-700 font-medium">
                          +${addOn.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedAddOns([]);
                    setIsBookingModalOpen(true);
                  }}
                  className="w-full mt-8 bg-amber-700 text-white px-6 py-3 rounded-md hover:bg-amber-800 transition-colors font-medium"
                >
                  Book Your Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        service={service}
        selectedAddOns={selectedAddOns}
        onEditAddOns={handleEditAddOns}
      />

      <AddOnsModal
        isOpen={isAddOnsModalOpen}
        onClose={() => setIsAddOnsModalOpen(false)}
        addOns={service.addOns || []}
        onAddOnsSelected={handleAddOnsSelected}
        onContinue={handleAddOnsContinue}
      />
    </div>
  );
}
