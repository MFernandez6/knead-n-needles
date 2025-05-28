"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { addDays, format } from "date-fns";

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
  price: { [key: string]: number } | string;
  addOns?: AddOn[];
  comingSoon?: boolean;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
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

const AVAILABLE_SERVICES: Service[] = [
  {
    id: "swedish",
    title: "Swedish Massage",
    subtitle: "The Tranquilizer",
    image: "/images/swedish.jpg",
    description:
      "The Monday blues recovery, the mid week sedative and finally the 'it's Friday, I made it!' This treatment uses a light to medium pressure massage focused to relieve both the mental and physical aspects of the body.",
    duration: "60-90 minutes",
    price: {
      "60": 120,
      "90": 180,
    },
    benefits: [
      "Reduces stress and anxiety",
      "Improves circulation",
      "Relieves muscle tension",
      "Promotes relaxation",
    ],
  },
  {
    id: "deep-tissue",
    title: "Deep Tissue",
    subtitle: "The Bulldozer",
    image: "/images/deep-tissue.jpg",
    description:
      "Don't let the name scare you, a skilled massage therapist can get into those sore muscles WITHOUT making you feel like you just finished a marathon. Using firm pressure we pinpoint exactly where it is affecting you.",
    duration: "60-90 minutes",
    price: {
      "60": 120,
      "90": 180,
    },
    benefits: [
      "Targets chronic pain",
      "Breaks down scar tissue",
      "Improves range of motion",
      "Relieves deep muscle tension",
    ],
  },
  {
    id: "sports",
    title: "Sports Massage",
    subtitle: "The Performance Enhancer",
    image: "/images/sports.webp",
    description:
      "Whether you're a weekend warrior or a professional athlete, this is your secret weapon! Think of it as a tune-up for your body's engine. We'll get those muscles firing on all cylinders.",
    duration: "60-90 minutes",
    price: {
      "60": 120,
      "90": 180,
    },
    benefits: [
      "Enhances athletic performance",
      "Prevents injuries",
      "Speeds up recovery",
      "Improves flexibility",
    ],
  },
  {
    id: "reflexology",
    title: "Reflexology",
    subtitle: "The Foot Whisperer",
    image: "/images/reflexology.jpeg",
    description:
      "Who knew your feet held the map to your body's wellness? It's like having a remote control for your entire system! Through gentle to firm pressure on specific points, we can help your body find its natural balance.",
    duration: "30 minutes",
    price: "40",
    benefits: [
      "Promotes natural wellness",
      "Improves circulation",
      "Reduces stress",
      "Enhances overall wellness",
    ],
  },
  {
    id: "tmj",
    title: "TMJ",
    subtitle: "Please, don't bite my finger off",
    image: "/images/tmj.jpg",
    description:
      "A specialized type of massage focusing on the muscles and tissues surrounding the temporomandibular joint, anterior part of the neck, occipital area of the neck, shoulders and back.",
    duration: "60 minutes",
    price: {
      "60": 120,
    },
    benefits: [
      "Relieves jaw tension",
      "Reduces headaches",
      "Improves jaw mobility",
      "Alleviates neck pain",
    ],
  },
];

export default function BookingModal({
  isOpen,
  onClose,
  selectedAddOns = [],
  onEditAddOns,
}: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(
    addDays(new Date(), 1)
  );
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<"60" | "90">("60");
  const [selectedService, setSelectedService] = useState<Service>({
    id: "",
    title: "",
    subtitle: "",
    image: "",
    description: "",
    benefits: [],
    duration: "",
    price: "0",
    addOns: [],
  });
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
  const basePrice =
    typeof selectedService.price === "object"
      ? selectedService.price[selectedDuration] || 0
      : parseInt(selectedService.price);
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
                          <label
                            htmlFor="service"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Select Your Service
                          </label>
                          <select
                            id="service"
                            name="service"
                            value={selectedService.id}
                            onChange={(e) => {
                              const newService = AVAILABLE_SERVICES.find(
                                (s) => s.id === e.target.value
                              );
                              if (newService) {
                                setSelectedService(newService);
                                // Reset duration if the new service doesn't support it
                                if (
                                  typeof newService.price === "string" ||
                                  !newService.price["90"]
                                ) {
                                  setSelectedDuration("60");
                                }
                              }
                            }}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                          >
                            <option value="">Select a Massage Type</option>
                            {AVAILABLE_SERVICES.map((service) => (
                              <option key={service.id} value={service.id}>
                                {service.title} - $
                                {typeof service.price === "object"
                                  ? Math.min(...Object.values(service.price))
                                  : service.price}
                              </option>
                            ))}
                          </select>
                          {selectedService.id && (
                            <div className="mt-2 text-sm text-gray-600">
                              {selectedService.subtitle}
                            </div>
                          )}
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
                            {selectedService.id && (
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">
                                  Base Service ({selectedService.title})
                                </span>
                                <span className="text-gray-700">
                                  ${basePrice}
                                </span>
                              </div>
                            )}
                            {selectedAddOns.length > 0 && (
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Add-Ons</span>
                                <span className="text-gray-700">
                                  +${totalAddOnsPrice}
                                </span>
                              </div>
                            )}
                            {selectedService.id && (
                              <div className="pt-2 border-t border-gray-200 flex justify-between items-center">
                                <span className="text-gray-900 font-medium">
                                  Total
                                </span>
                                <span className="text-amber-700 font-medium text-lg">
                                  ${totalPrice}
                                </span>
                              </div>
                            )}
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
