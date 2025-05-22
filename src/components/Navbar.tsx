"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import BookingModal from "./BookingModal";

interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const selectedAddOns: AddOn[] = [];

  const handleEditAddOns = () => {
    // Redirect to services page for add-on selection
    window.location.href = "/services";
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-32 h-16">
                <Image
                  src="/logo-SVG.svg"
                  alt="Needle & Knead Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              {/* <span className="text-2xl font-bold text-amber-700">
                Needle & Knead
              </span> */}
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link
              href="/services"
              className="text-gray-600 hover:text-amber-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-amber-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              About Me
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-amber-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Contact
            </Link>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-amber-700 text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-amber-800 transition-colors duration-200 shadow-sm hover:shadow"
            >
              Book Now
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-amber-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500 transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {/* Menu icon */}
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
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
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/services"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-amber-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-amber-700 hover:bg-gray-50 transition-colors duration-200"
            >
              About Me
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-amber-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Contact
            </Link>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="block w-full text-left px-3 py-2 text-base font-medium text-white bg-amber-700 hover:bg-amber-800 transition-colors duration-200"
            >
              Book Now
            </button>
          </div>
        </div>
      )}

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedAddOns={selectedAddOns}
        onEditAddOns={handleEditAddOns}
      />
    </nav>
  );
};

export default Navbar;
