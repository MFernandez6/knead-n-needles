"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import BookingModal from "./BookingModal";
import AddOnsModal from "./AddOnsModal";

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

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAddOnsModalOpen, setIsAddOnsModalOpen] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleEditAddOns = () => {
    setIsAddOnsModalOpen(true);
  };

  const handleAddOnsSelected = (addOns: AddOn[]) => {
    setSelectedAddOns(addOns);
  };

  const handleAddOnsContinue = (addOns: AddOn[]) => {
    setSelectedAddOns(addOns);
    setIsAddOnsModalOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled ? "glass shadow-lg border-b border-amber-100" : "glass"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-36 h-16 transition-all duration-300 group-hover:scale-105">
                <Image
                  src="/logo-SVG.svg"
                  alt="Needle & Knead Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link
              href="/services"
              className="text-gray-700 hover:text-amber-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-amber-50 relative group focus-ring"
            >
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-amber-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-amber-50 relative group focus-ring"
            >
              About Me
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-amber-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-amber-50 relative group focus-ring"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-amber-200 focus:outline-none text-sm animate-pulse-glow"
            >
              Book Now
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-amber-700 hover:bg-amber-50 focus-ring transition-all duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {/* Animated hamburger icon */}
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
                  }`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`sm:hidden transition-all duration-300 ease-out overflow-hidden ${
          isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 glass border-t border-amber-100">
          <Link
            href="/services"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-all duration-300 focus-ring"
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            href="/about"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-all duration-300 focus-ring"
            onClick={() => setIsMenuOpen(false)}
          >
            About Me
          </Link>
          <Link
            href="/contact"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-all duration-300 focus-ring"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <button
            onClick={() => {
              setIsBookingModalOpen(true);
              setIsMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 text-base font-medium text-white bg-amber-700 hover:bg-amber-800 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-200"
          >
            Book Now
          </button>
        </div>
      </div>

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
    </nav>
  );
};

export default Navbar;
