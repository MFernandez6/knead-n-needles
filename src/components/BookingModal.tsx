"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { format, addDays } from "date-fns";

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

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service;
  selectedAddOns: AddOn[];
  onEditAddOns: () => void;
}

const AVAILABLE_HOURS = [
  "9:00 AM",
  "10:30 AM",
  "12:00 PM",
  "1:30 PM",
  "3:00 PM",
  "4:30 PM",
  "6:00 PM",
  "7:30 PM",
];

const SERVICES = [
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
    subtitle: "Please, don't bite my finger off",
    image: "/images/tmj.jpg",
    description:
      "Specialized massage focusing on the temporomandibular joint and surrounding muscles.",
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

export default function BookingModal({
  isOpen,
  onClose,
  service = {
    id: "",
    title: "",
    subtitle: "",
    image: "",
    description: "",
    benefits: [],
    duration: "",
    price: "0",
    addOns: [],
  },
  selectedAddOns = [],
  onEditAddOns,
}: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(
    addDays(new Date(), 1)
  );
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<Service>(SERVICES[0]);
  const [selectedDuration, setSelectedDuration] = useState<"60" | "90">("60");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalAddOnsPrice = (selectedAddOns || []).reduce(
    (sum, addOn) => sum + addOn.price,
    0
  );
  const basePrice = selectedDuration === "60" ? 100 : 150;
  const totalPrice = basePrice + totalAddOnsPrice;

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Prepare booking details
      const bookingDetails = {
        service: selectedService.title,
        duration: `${selectedDuration} minutes`,
        date: format(selectedDate, "MMMM d, yyyy"),
        time: selectedTime,
        addOns: selectedAddOns.map((addOn) => addOn.name),
        totalPrice,
        customerName: formData.name,
        customerEmail: formData.email,
      };

      // Send booking details to API
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingDetails),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send confirmation email");
      }

      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting booking:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to send confirmation email"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white/95 backdrop-blur-sm px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white/80 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {isSuccess ? (
                  <div className="text-center py-8">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      Booking Confirmed!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      A confirmation email has been sent to {formData.email}{" "}
                      with your booking details.
                    </p>
                    <button
                      onClick={onClose}
                      className="inline-block bg-amber-700 text-white px-6 py-2 rounded-md hover:bg-amber-800 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                        <Dialog.Title
                          as="h3"
                          className="text-2xl font-semibold leading-6 text-gray-900 mb-4"
                        >
                          Complete Your Booking
                        </Dialog.Title>

                        {/* Service Selection */}
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Service
                          </label>
                          <select
                            value={selectedService.id}
                            onChange={(e) => {
                              const service = SERVICES.find(
                                (s) => s.id === e.target.value
                              );
                              if (service) {
                                setSelectedService(service);
                              }
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                          >
                            {SERVICES.map((service) => (
                              <option key={service.id} value={service.id}>
                                {service.title} - ${service.price}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={onEditAddOns}
                            className="mt-2 text-sm text-amber-700 hover:text-amber-800 font-medium"
                          >
                            Add Enhancements to Your Service
                          </button>
                        </div>

                        {/* Selected Add-Ons Preview */}
                        {selectedAddOns.length > 0 && (
                          <div className="mb-6 bg-gray-50 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-3">
                              <h4 className="text-sm font-medium text-gray-700">
                                Selected Add-Ons
                              </h4>
                              <button
                                type="button"
                                onClick={onEditAddOns}
                                className="text-sm text-amber-700 hover:text-amber-800 font-medium"
                              >
                                Edit
                              </button>
                            </div>
                            <div className="space-y-2">
                              {selectedAddOns.map((addOn) => (
                                <div
                                  key={addOn.id}
                                  className="flex justify-between items-center text-sm"
                                >
                                  <span className="text-gray-600">
                                    {addOn.name}
                                  </span>
                                  <span className="text-amber-700 font-medium">
                                    +${addOn.price}
                                  </span>
                                </div>
                              ))}
                              <div className="pt-2 border-t border-gray-200 flex justify-between items-center">
                                <span className="text-gray-700 font-medium">
                                  Add-Ons Total
                                </span>
                                <span className="text-amber-700 font-medium">
                                  +${totalAddOnsPrice}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Duration Selection (if applicable) */}
                        {selectedService.duration.includes("60-90") && (
                          <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Select Duration
                            </label>
                            <div className="flex space-x-4">
                              <button
                                type="button"
                                onClick={() => setSelectedDuration("60")}
                                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                                  selectedDuration === "60"
                                    ? "bg-amber-700 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                              >
                                60 Minutes
                              </button>
                              <button
                                type="button"
                                onClick={() => setSelectedDuration("90")}
                                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium ${
                                  selectedDuration === "90"
                                    ? "bg-amber-700 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                              >
                                90 Minutes
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Date Selection */}
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Date
                          </label>
                          <input
                            type="date"
                            min={format(addDays(new Date(), 1), "yyyy-MM-dd")}
                            value={format(selectedDate, "yyyy-MM-dd")}
                            onChange={(e) =>
                              setSelectedDate(new Date(e.target.value))
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                          />
                        </div>

                        {/* Time Selection */}
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Time
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {AVAILABLE_HOURS.map((time) => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => setSelectedTime(time)}
                                className={`py-2 px-3 rounded-md text-sm font-medium ${
                                  selectedTime === time
                                    ? "bg-amber-700 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Total Price Summary */}
                        <div className="mb-6 bg-gray-50 rounded-lg p-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-600">
                                Base Service
                              </span>
                              <span className="text-gray-700">
                                ${basePrice}
                              </span>
                            </div>
                            {selectedAddOns.length > 0 && (
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Add-Ons</span>
                                <span className="text-gray-700">
                                  +${totalAddOnsPrice}
                                </span>
                              </div>
                            )}
                            <div className="pt-2 border-t border-gray-200 flex justify-between items-center">
                              <span className="text-gray-900 font-medium">
                                Total
                              </span>
                              <span className="text-amber-700 font-medium text-lg">
                                ${totalPrice}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Personal Information */}
                        <div className="space-y-4">
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Full Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              required
                              value={formData.name}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="phone"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              id="phone"
                              required
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        {error && (
                          <div className="mt-4 text-red-600 text-sm">
                            {error}
                          </div>
                        )}

                        <div className="mt-6">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-amber-700 text-white px-4 py-3 rounded-md hover:bg-amber-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isSubmitting
                              ? "Processing..."
                              : "Complete Booking"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
