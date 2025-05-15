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
  const basePrice = parseInt((service?.price || "0").replace(/[^0-9]/g, ""));
  const totalPrice = basePrice + totalAddOnsPrice;

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Prepare booking details
      const bookingDetails = {
        service: service.title,
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

                        {/* Selected Service and Add-Ons Summary */}
                        <div className="mb-6">
                          <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <h4 className="font-medium text-gray-900 mb-2">
                              Selected Service
                            </h4>
                            <p className="text-gray-600">{service.title}</p>
                            <p className="text-sm text-gray-500 mt-1">
                              {service.duration}
                            </p>
                            <p className="text-amber-700 font-medium mt-1">
                              ${basePrice}
                            </p>
                          </div>

                          {selectedAddOns.length > 0 && (
                            <div className="bg-gray-50 rounded-lg p-4">
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="font-medium text-gray-900">
                                  Selected Add-Ons
                                </h4>
                                <button
                                  type="button"
                                  onClick={onEditAddOns}
                                  className="text-amber-700 hover:text-amber-800 text-sm font-medium"
                                >
                                  Edit Add-Ons
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
                                <div className="border-t border-gray-200 pt-2 mt-2">
                                  <div className="flex justify-between items-center font-medium">
                                    <span className="text-gray-900">
                                      Total Add-Ons
                                    </span>
                                    <span className="text-amber-700">
                                      +${totalAddOnsPrice}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Date and Time Selection */}
                        <div className="mb-6">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <label
                                htmlFor="date"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Date
                              </label>
                              <input
                                type="date"
                                id="date"
                                name="date"
                                min={format(
                                  addDays(new Date(), 1),
                                  "yyyy-MM-dd"
                                )}
                                value={format(selectedDate, "yyyy-MM-dd")}
                                onChange={(e) =>
                                  setSelectedDate(new Date(e.target.value))
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                                required
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="time"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Time
                              </label>
                              <select
                                id="time"
                                name="time"
                                value={selectedTime}
                                onChange={(e) =>
                                  setSelectedTime(e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                                required
                              >
                                <option value="">Select a time</option>
                                {AVAILABLE_HOURS.map((time) => (
                                  <option key={time} value={time}>
                                    {time}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Total Price */}
                        <div className="mb-6 p-4 bg-amber-50 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-medium text-gray-900">
                              Total Price
                            </span>
                            <span className="text-xl font-bold text-amber-700">
                              ${totalPrice}
                            </span>
                          </div>
                        </div>

                        {/* Booking Form */}
                        <div className="space-y-4">
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                              required
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
                              value={formData.email}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="phone"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Phone
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              id="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                              required
                            />
                          </div>
                        </div>

                        {error && (
                          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-red-700 text-sm">{error}</p>
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
