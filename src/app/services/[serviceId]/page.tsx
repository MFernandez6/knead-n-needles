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
  price: {
    [key: string]: number;
  };
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
      "The Monday blues recovery, the mid week sedative and finally the 'it's Friday, I made it!' This treatment uses a light to medium pressure massage focused to relieve both the mental and physical aspects of the body. You'll leave the world behind with this one!",
    benefits: [
      "Reduces muscle tension",
      "Improves circulation",
      "Promotes relaxation",
      "Enhances flexibility",
      "Relieves stress and anxiety",
    ],
    duration: "60-90 minutes",
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
      "Don't let the name scare you, a skilled massage therapist can get into those sore muscles WITHOUT making you feel like you just finished a marathon. Using firm pressure we pinpoint exactly where it is affecting you, target and release the knot. Feel but not hurt.",
    benefits: [
      "Breaks down scar tissue",
      "Relieves chronic pain",
      "Improves posture",
      "Increases range of motion",
      "Reduces inflammation",
    ],
    duration: "60-90 minutes",
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
      "Whether you're a weekend warrior or a professional athlete, this is your secret weapon! Think of it as a tune-up for your body's engine. We'll get those muscles firing on all cylinders, improve your range of motion, and have you performing at your peak. It's like having a pit crew for your body!",
    benefits: [
      "Prevents injuries",
      "Improves athletic performance",
      "Speeds up recovery time",
      "Increases flexibility",
    ],
    duration: "60-90 minutes",
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
    id: "acupuncture",
    title: "Acupuncture Therapy",
    subtitle: "Coming Soon",
    image: "/images/acupuncture.jpg",
    description:
      "Traditional Chinese medicine technique that involves inserting thin needles into specific points on the body to treat pain and various conditions.",
    benefits: [
      "Pain management",
      "Stress reduction",
      "Improved sleep",
      "Better digestion",
      "Enhanced energy flow",
      "Strengthened immune system",
      "Improved mental clarity",
    ],
    duration: "45-60 minutes",
    price: {
      "60": 120,
      "90": 180,
    },
    comingSoon: true,
  },
  {
    id: "reflexology",
    title: "Reflexology",
    subtitle: "The Foot Whisperer",
    image: "/images/reflexology.jpeg",
    description:
      "Who knew your feet held the map to your body's wellness? It's like having a remote control for your entire system! Through gentle to firm pressure on specific points, we can help your body find its natural balance. It's not just a foot massage - it's a full-body experience through your feet!",
    benefits: [
      "Stress reduction",
      "Improved circulation",
      "Better sleep",
      "Enhanced energy levels",
      "Natural pain relief",
      "Boosted immune function",
      "Improved mental clarity",
    ],
    duration: "30 minutes",
    price: {
      "30": 40,
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
      "A specialized type of massage focusing on the muscles and tissues surrounding the temporomandibular joint, anterior part of the neck, occipital area of the neck, shoulders and back. Using a pair of gloves to dove into the inside area of the mouth and addressing the interior muscles that can become tight, create pain and limit jaw mobility, hence the nickname.",
    benefits: [
      "Relieves jaw tension",
      "Improves jaw mobility",
      "Reduces TMJ pain",
      "Addresses neck and shoulder tension",
      "Enhances overall facial comfort",
    ],
    duration: "60 minutes",
    price: {
      "60": 120,
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
              <div className="mt-2 space-y-2">
                {Object.entries(service.price).map(([duration, price]) => (
                  <div
                    key={duration}
                    className="flex items-center justify-between"
                  >
                    <span className="text-gray-600">{duration} minutes</span>
                    <span className="text-2xl font-bold text-amber-700">
                      ${price}
                    </span>
                  </div>
                ))}
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
