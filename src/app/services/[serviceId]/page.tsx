/* eslint-disable react/no-unescaped-entities */
"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import BookingModal from "@/components/BookingModal";
import AddOnsModal from "@/components/AddOnsModal";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

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
          "Tibetan singing bowls create therapeutic vibrations that promote deep relaxation and restoration.",
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
          "Tibetan singing bowls create therapeutic vibrations that promote deep relaxation and restoration.",
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
          "Tibetan singing bowls create therapeutic vibrations that promote deep relaxation and restoration.",
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
      "Foot massage that stimulates pressure points to improve overall wellness.",
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
          "Tibetan singing bowls create therapeutic vibrations that promote deep relaxation and restoration.",
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
          "Tibetan singing bowls create therapeutic vibrations that promote deep relaxation and restoration.",
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
  const router = useRouter();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAddOnsModalOpen, setIsAddOnsModalOpen] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);

  const service = SERVICES.find((s) => s.id === params.serviceId);

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Service not found
            </h1>
            <p className="mt-4 text-gray-600">
              The requested service could not be found.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleEditAddOns = () => {
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

  const handleBookNow = () => {
    setSelectedAddOns([]);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Services
        </button>
      </div>

      {/* Service Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Service Image */}
          <div className="relative h-64 lg:h-full rounded-lg overflow-hidden">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Service Details */}
          <div className="mt-8 lg:mt-0">
            <h1 className="text-3xl font-bold text-gray-900">
              {service.title}
            </h1>
            <p className="mt-2 text-xl text-amber-700">{service.subtitle}</p>
            <p className="mt-4 text-gray-600">{service.description}</p>

            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900">Benefits</h2>
              <ul className="mt-2 space-y-2">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 text-amber-700">
                      •
                    </span>
                    <span className="ml-2 text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900">
                Duration & Price
              </h2>
              <div className="mt-2 flex items-center space-x-4">
                <span className="text-gray-600">{service.duration}</span>
                <span className="text-2xl font-bold text-amber-700">
                  ${service.price}
                </span>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={handleBookNow}
                className="w-full bg-amber-700 text-white px-6 py-3 rounded-md hover:bg-amber-800 transition-colors font-medium"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

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
        addOns={service.addOns || []}
        onAddOnsSelected={handleAddOnsSelected}
        onContinue={handleAddOnsContinue}
      />
    </div>
  );
}
