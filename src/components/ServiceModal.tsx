"use client";

import Image from "next/image";
import { useEffect } from "react";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNow: () => void;
  service: {
    id: string;
    title: string;
    image: string;
    description: string;
    benefits: string[];
    duration: string;
    price: string;
  } | null;
}

const ServiceModal = ({
  isOpen,
  onClose,
  onBookNow,
  service,
}: ServiceModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative h-80">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold">{service.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <p className="text-gray-600 text-lg mb-6">{service.description}</p>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Benefits:</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              {service.benefits.map((benefit, index) => (
                <li key={index} className="text-lg">
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-600 text-lg">{service.duration}</span>
            <span className="font-semibold text-amber-700 text-xl">
              {service.price}
            </span>
          </div>

          <button
            onClick={onBookNow}
            className="w-full bg-amber-700 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-amber-800 transition-colors"
          >
            Book This Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
