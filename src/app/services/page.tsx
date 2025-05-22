"use client";

import { Suspense } from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ServiceModal from "@/components/ServiceModal";
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

const addOns = [
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
];

const services = [
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
    price: "From $100",
    addOns: addOns,
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
    price: "From $100",
    addOns: addOns,
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
    price: "From $100",
    addOns: addOns,
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
    price: "From $100",
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
    price: "From $40",
    addOns: addOns,
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
    price: "From $100",
    addOns: addOns,
  },
];

function ServicesContent() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAddOnsModalOpen, setIsAddOnsModalOpen] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const serviceId = searchParams.get("service");
    if (serviceId) {
      const service = services.find((s) => s.id === serviceId);
      if (service) {
        setSelectedService(service);
      }
    }
  }, [searchParams]);

  const handleBookNow = (service?: Service) => {
    if (service) {
      setSelectedService(service);
    } else {
      setSelectedService(null);
    }
    setSelectedAddOns([]);
    setIsBookingModalOpen(true);
  };

  const handleAddOnsSelected = (addOns: AddOn[]) => {
    setSelectedAddOns(addOns);
  };

  const handleAddOnsContinue = (addOns: AddOn[]) => {
    setSelectedAddOns(addOns);
    setIsAddOnsModalOpen(false);
    setIsBookingModalOpen(true);
  };

  const handleEditAddOns = () => {
    setIsBookingModalOpen(false);
    setIsAddOnsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-amber-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-4">Our Services</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Discover our range of professional massage and therapy services
            designed to enhance your well-being and promote wellness.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                id={service.id}
                className={`bg-white rounded-lg shadow-sm overflow-hidden scroll-mt-20 ${
                  service.comingSoon ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <div className="relative h-64">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                  {service.comingSoon && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <span className="bg-amber-700 text-white px-4 py-2 rounded-md text-lg font-medium">
                        Coming Soon
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2">
                    {service.title}
                  </h2>
                  {service.subtitle && (
                    <p className="text-amber-700 font-medium mb-4">
                      {service.subtitle}
                    </p>
                  )}
                  <p className="text-gray-600 mb-4">{service.description}</p>

                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Benefits:</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {service.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">{service.duration}</span>
                    <span className="font-semibold text-amber-700">
                      {service.price}
                    </span>
                  </div>

                  {!service.comingSoon && (
                    <button
                      onClick={() => handleBookNow(service)}
                      className="block w-full text-center bg-amber-700 text-white px-4 py-2 rounded-md hover:bg-amber-800 transition-colors"
                    >
                      Book Your Appointment
                    </button>
                  )}
                  {service.comingSoon && (
                    <button
                      disabled
                      className="block w-full text-center bg-gray-300 text-gray-500 px-4 py-2 rounded-md cursor-not-allowed"
                    >
                      Coming Soon
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-amber-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience the Benefits?
          </h2>
          <p className="text-xl max-w-3xl mx-auto">
            Book your session today and take the first step towards better
            health and wellness.
          </p>
        </div>
      </section>

      <ServiceModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        service={selectedService}
        onBookNow={() => {
          if (selectedService) {
            handleBookNow(selectedService);
          }
        }}
      />

      <AddOnsModal
        isOpen={isAddOnsModalOpen}
        onClose={() => setIsAddOnsModalOpen(false)}
        addOns={selectedService?.addOns || []}
        onAddOnsSelected={handleAddOnsSelected}
        onContinue={handleAddOnsContinue}
      />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedAddOns={selectedAddOns}
        onEditAddOns={handleEditAddOns}
      />
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServicesContent />
    </Suspense>
  );
}
