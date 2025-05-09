"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ServiceModal from "@/components/ServiceModal";
import BookingModal from "@/components/BookingModal";

const services = [
  {
    id: "swedish",
    title: "Swedish Massage",
    image: "/images/swedish.jpg",
    description:
      "A gentle, relaxing massage that promotes overall wellness and stress relief.",
    benefits: [
      "Reduces muscle tension",
      "Improves circulation",
      "Promotes relaxation",
      "Enhances flexibility",
      "Relieves stress and anxiety",
    ],
    duration: "60-90 minutes",
    price: "From $80",
  },
  {
    id: "deep-tissue",
    title: "Deep Tissue Massage",
    image: "/images/deep-tissue.jpg",
    description:
      "Targeted pressure to release chronic muscle tension and improve mobility.",
    benefits: [
      "Breaks down scar tissue",
      "Relieves chronic pain",
      "Improves posture",
      "Increases range of motion",
      "Reduces inflammation",
    ],
    duration: "60-90 minutes",
    price: "From $90",
  },
  {
    id: "sports",
    title: "Sports Massage",
    image: "/images/sports.webp",
    description:
      "Specialized massage for athletes to enhance performance and recovery.",
    benefits: [
      "Prevents injuries",
      "Improves athletic performance",
      "Speeds up recovery time",
      "Increases flexibility",
      "Reduces muscle soreness",
    ],
    duration: "60-90 minutes",
    price: "From $95",
  },
  {
    id: "acupuncture",
    title: "Acupuncture Therapy",
    image: "/images/acupuncture.jpg",
    description:
      "Traditional Chinese medicine technique that involves inserting thin needles into specific points on the body to treat pain and various conditions.",
    benefits: [
      "Pain management",
      "Stress reduction",
      "Improved sleep",
      "Better digestion",
      "Enhanced energy flow",
    ],
    duration: "45-60 minutes",
    price: "From $85",
  },
  {
    id: "cupping",
    title: "Cupping Therapy",
    image: "/images/cupping.jpg",
    description:
      "An alternative medicine practice where cups are placed on the skin to create suction, potentially relieving pain and promoting healing.",
    benefits: [
      "Pain relief",
      "Improved circulation",
      "Reduced inflammation",
      "Muscle relaxation",
      "Detoxification",
    ],
    duration: "30-45 minutes",
    price: "From $75",
  },
  {
    id: "reflexology",
    title: "Reflexology",
    image: "/images/reflexology.jpeg",
    description:
      "Reflexology uses gentle to firm pressure on different pressure points of the feet, hands, and ears.",
    benefits: [
      "Stress reduction",
      "Improved circulation",
      "Better sleep",
      "Enhanced energy levels",
      "Natural pain relief",
    ],
    duration: "45-60 minutes",
    price: "From $70",
  },
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<
    (typeof services)[0] | null
  >(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
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

  const handleBookNow = (service: (typeof services)[0]) => {
    setSelectedService(service);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-4">Our Services</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Discover our range of professional massage and therapy services
            designed to enhance your well-being and promote healing.
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
                className="bg-white rounded-lg shadow-sm overflow-hidden scroll-mt-20"
              >
                <div className="relative h-64">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">
                    {service.title}
                  </h2>
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
                    <span className="font-semibold text-indigo-600">
                      {service.price}
                    </span>
                  </div>

                  <button
                    onClick={() => handleBookNow(service)}
                    className="block w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience the Benefits?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Book your session today and take the first step towards better
            health and wellness.
          </p>
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Book Your Appointment
          </button>
        </div>
      </section>

      <ServiceModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        service={selectedService}
      />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedService={selectedService?.title}
      />
    </div>
  );
}
