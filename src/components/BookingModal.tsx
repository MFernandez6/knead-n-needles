"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle, CreditCard, Clock } from "lucide-react";
import PaymentForm from "./PaymentForm";

interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAddOns: AddOn[];
  onEditAddOns: () => void;
}

export default function BookingModal({
  isOpen,
  onClose,
  selectedAddOns,
  onEditAddOns,
}: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    duration: "",
    date: "",
    time: "",
    notes: "",
    additionalNotes: "",
  });

  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [showPayment, setShowPayment] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentOption, setPaymentOption] = useState<"now" | "later" | null>(
    null
  );

  const services = [
    { id: "", name: "Select a Massage Type" },
    { id: "swedish", name: "Swedish Massage" },
    { id: "deep-tissue", name: "Deep Tissue Massage" },
    { id: "sports", name: "Sports Massage" },
    { id: "reflexology", name: "Reflexology" },
    { id: "tmj", name: "TMJ Massage" },
  ];

  const durations = [
    { id: "", name: "Select Duration" },
    { id: "60", name: "60 minutes - $120" },
    { id: "90", name: "90 minutes - $180" },
  ];

  const basePrice =
    formData.duration === "60" ? 120 : formData.duration === "90" ? 180 : 0;
  const addOnsTotal = selectedAddOns.reduce(
    (sum, addOn) => sum + addOn.price,
    0
  );
  const totalPrice = basePrice + addOnsTotal;

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

  useEffect(() => {
    if (formData.date && formData.duration) {
      fetchAvailableTimes(formData.date, parseInt(formData.duration));
    }
  }, [formData.date, formData.duration]);

  const fetchAvailableTimes = async (date: string, duration: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/available-times?date=${date}&duration=${duration}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAvailableTimes(data.availableTimes || []);
      } else {
        console.error("Failed to fetch available times");
        setAvailableTimes([]);
      }
    } catch (error) {
      console.error("Error fetching available times:", error);
      setAvailableTimes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Reset time if date or duration changes
    if (name === "date" || name === "duration") {
      setSelectedTime("");
      setFormData((prev) => ({ ...prev, time: "" }));
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setFormData((prev) => ({ ...prev, time }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.service ||
      !formData.duration ||
      !formData.date ||
      !selectedTime
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Show payment option selection
    setShowPayment(true);
  };

  const handlePaymentOptionSelect = (option: "now" | "later") => {
    setPaymentOption(option);

    if (option === "later") {
      // Skip payment and go directly to booking confirmation
      handlePaymentSuccess();
    }
  };

  const handlePaymentSuccess = async () => {
    setIsPaymentProcessing(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: formData.name,
          customerEmail: formData.email,
          phone: formData.phone,
          service:
            services.find((s) => s.id === formData.service)?.name ||
            formData.service,
          duration: formData.duration,
          date: formData.date,
          time: formData.time,
          notes: formData.notes,
          additionalNotes: formData.additionalNotes,
          addOns: selectedAddOns.map((addOn) => addOn.name),
          totalPrice,
          paymentOption,
        }),
      });

      if (response.ok) {
        setShowConfirmation(true);
        setShowPayment(false);
      } else {
        setPaymentError(
          "Failed to send booking confirmation. Please contact us."
        );
      }
    } catch (error) {
      console.error("Error sending booking request:", error);
      setPaymentError(
        "Failed to send booking confirmation. Please contact us."
      );
    } finally {
      setIsPaymentProcessing(false);
    }
  };

  const handlePaymentError = (error: string) => {
    setPaymentError(error);
    setIsPaymentProcessing(false);
  };

  const handleClose = () => {
    onClose();
    setShowPayment(false);
    setShowConfirmation(false);
    setPaymentError(null);
    setPaymentOption(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      duration: "",
      date: "",
      time: "",
      notes: "",
      additionalNotes: "",
    });
    setSelectedTime("");
  };

  const morningTimes = availableTimes.filter((time) => {
    const hour = parseInt(time.split(":")[0]);
    return hour < 12;
  });

  const afternoonTimes = availableTimes.filter((time) => {
    const hour = parseInt(time.split(":")[0]);
    return hour >= 12;
  });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      style={{
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
      }}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in transform"
        style={{
          margin: "auto",
          position: "relative",
          zIndex: 51,
        }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {showConfirmation
                ? "Booking Confirmed!"
                : showPayment
                ? paymentOption === "now"
                  ? "Complete Payment"
                  : "Payment Options"
                : "Book Your Appointment"}
            </h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {showConfirmation ? (
            // Confirmation Screen
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  Thank you for your booking!
                </h3>

                <div className="bg-amber-50 rounded-lg p-6 space-y-3">
                  <div className="text-left space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-medium text-gray-900">
                        {services.find((s) => s.id === formData.service)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium text-gray-900">
                        {formData.duration === "60"
                          ? "60 minutes"
                          : "90 minutes"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(formData.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium text-gray-900">
                        {formData.time}
                      </span>
                    </div>
                    {selectedAddOns.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Enhancements:</span>
                        <span className="font-medium text-gray-900">
                          {selectedAddOns.map((addOn) => addOn.name).join(", ")}
                        </span>
                      </div>
                    )}
                    <div className="border-t border-amber-200 pt-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 font-medium">
                          Total:
                        </span>
                        <span className="font-bold text-amber-700">
                          ${totalPrice}
                        </span>
                      </div>
                    </div>
                    <div className="border-t border-amber-200 pt-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment:</span>
                        <span className="font-medium text-gray-900">
                          {paymentOption === "now"
                            ? "Paid Now"
                            : "Pay After Service"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
                  <p className="font-medium mb-2">What happens next?</p>
                  <ul className="space-y-1 text-left">
                    <li>• You&apos;ll receive a confirmation email shortly</li>
                    <li>
                      • Please check your spam/junk folder if you don&apos;t see
                      it
                    </li>
                    <li>
                      • We&apos;ll contact you 24 hours before your appointment
                    </li>
                    <li>• Please arrive 10 minutes early for your session</li>
                    {paymentOption === "later" && (
                      <li>• Payment will be collected after your massage</li>
                    )}
                  </ul>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Close
              </button>
            </div>
          ) : showPayment ? (
            // Payment Options Screen
            <div className="space-y-6">
              {!paymentOption ? (
                // Payment Option Selection
                <div className="space-y-6">
                  <div className="bg-amber-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">
                        Booking Summary
                      </h3>
                      <CreditCard className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Service:</span>
                        <span className="text-gray-900">
                          {
                            services.find((s) => s.id === formData.service)
                              ?.name
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Duration:</span>
                        <span className="text-gray-900">
                          {formData.duration === "60"
                            ? "60 minutes"
                            : "90 minutes"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Date & Time:</span>
                        <span className="text-gray-900">
                          {new Date(formData.date).toLocaleDateString()} at{" "}
                          {formData.time}
                        </span>
                      </div>
                      {selectedAddOns.length > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-700">Enhancements:</span>
                          <span className="text-gray-900">
                            {selectedAddOns
                              .map((addOn) => addOn.name)
                              .join(", ")}
                          </span>
                        </div>
                      )}
                      <div className="border-t border-amber-200 pt-2">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-900">
                            Total:
                          </span>
                          <span className="font-bold text-amber-700">
                            ${totalPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 text-center">
                      Choose Payment Option
                    </h3>

                    <div className="grid grid-cols-1 gap-4">
                      <button
                        onClick={() => handlePaymentOptionSelect("now")}
                        className="flex items-center justify-between p-4 border-2 border-amber-200 rounded-lg hover:border-amber-400 hover:bg-amber-50 transition-all duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          <CreditCard className="w-6 h-6 text-amber-600" />
                          <div className="text-left">
                            <div className="font-semibold text-gray-900">
                              Pay Now
                            </div>
                            <div className="text-sm text-gray-600">
                              Secure payment with Stripe
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-amber-700">
                            ${totalPrice}
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => handlePaymentOptionSelect("later")}
                        className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          <Clock className="w-6 h-6 text-gray-600" />
                          <div className="text-left">
                            <div className="font-semibold text-gray-900">
                              Pay After Service
                            </div>
                            <div className="text-sm text-gray-600">
                              Pay when you arrive
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-700">
                            ${totalPrice}
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              ) : paymentOption === "now" ? (
                // Stripe Payment Form
                <div className="space-y-6">
                  <div className="bg-amber-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">
                        Payment Details
                      </h3>
                      <CreditCard className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Service:</span>
                        <span className="text-gray-900">
                          {
                            services.find((s) => s.id === formData.service)
                              ?.name
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Duration:</span>
                        <span className="text-gray-900">
                          {formData.duration === "60"
                            ? "60 minutes"
                            : "90 minutes"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Date & Time:</span>
                        <span className="text-gray-900">
                          {new Date(formData.date).toLocaleDateString()} at{" "}
                          {formData.time}
                        </span>
                      </div>
                      {selectedAddOns.length > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-700">Enhancements:</span>
                          <span className="text-gray-900">
                            {selectedAddOns
                              .map((addOn) => addOn.name)
                              .join(", ")}
                          </span>
                        </div>
                      )}
                      <div className="border-t border-amber-200 pt-2">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-900">
                            Total:
                          </span>
                          <span className="font-bold text-amber-700">
                            ${totalPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {paymentError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-800 text-sm">{paymentError}</p>
                    </div>
                  )}

                  {process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? (
                    <PaymentForm
                      amount={totalPrice}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                      isProcessing={isPaymentProcessing}
                      setIsProcessing={setIsPaymentProcessing}
                    />
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-yellow-800 text-sm">
                        Payment processing is not configured. Please contact us
                        to complete your booking.
                      </p>
                      <button
                        onClick={handlePaymentSuccess}
                        className="mt-3 w-full bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-800 transform hover:scale-105 transition-all duration-300"
                      >
                        Continue Without Payment
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setPaymentOption(null)}
                    className="w-full bg-white text-amber-700 px-6 py-3 rounded-lg font-semibold border-2 border-amber-700 hover:bg-amber-50 transform hover:scale-105 transition-all duration-300"
                  >
                    Back to Payment Options
                  </button>
                </div>
              ) : null}

              {!paymentOption && (
                <button
                  type="button"
                  onClick={() => setShowPayment(false)}
                  className="w-full bg-white text-amber-700 px-6 py-3 rounded-lg font-semibold border-2 border-amber-700 hover:bg-amber-50 transform hover:scale-105 transition-all duration-300"
                >
                  Back to Booking
                </button>
              )}
            </div>
          ) : (
            // Booking Form
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>

              {/* Additional Notes Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors resize-none"
                  placeholder="Any special requests, health conditions, or preferences we should know about..."
                />
              </div>

              {/* Service Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Type *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                  >
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration *
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                  >
                    {durations.map((duration) => (
                      <option key={duration.id} value={duration.id}>
                        {duration.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date and Time Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time *
                  </label>
                  {isLoading ? (
                    <div className="flex items-center justify-center h-12 bg-gray-50 rounded-lg">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-600"></div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {morningTimes.length > 0 && (
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-2">
                            Morning
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {morningTimes.map((time) => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => handleTimeSelect(time)}
                                className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                                  selectedTime === time
                                    ? "bg-amber-700 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-amber-100 hover:text-amber-700"
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {afternoonTimes.length > 0 && (
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-2">
                            Afternoon
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {afternoonTimes.map((time) => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => handleTimeSelect(time)}
                                className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                                  selectedTime === time
                                    ? "bg-amber-700 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-amber-100 hover:text-amber-700"
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {availableTimes.length === 0 && formData.date && (
                        <div className="text-center py-4 text-gray-500">
                          No available times for this date. Please select a
                          different date.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Add-ons Section */}
              {selectedAddOns.length > 0 && (
                <div className="bg-amber-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">
                      Selected Enhancements
                    </h3>
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
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-700">{addOn.name}</span>
                        <span className="text-amber-700 font-medium">
                          ${addOn.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add Enhancements Button */}
              {selectedAddOns.length === 0 && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={onEditAddOns}
                    className="text-amber-700 hover:text-amber-800 font-medium underline"
                  >
                    Add Enhancements to Your Service
                  </button>
                </div>
              )}

              {/* Price Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Base Price:</span>
                  <span className="text-gray-900">${basePrice}</span>
                </div>
                {selectedAddOns.length > 0 && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Enhancements:</span>
                    <span className="text-gray-900">${addOnsTotal}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total:</span>
                    <span className="text-xl font-bold text-amber-700">
                      ${totalPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* Special Requests Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requests or Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors resize-none"
                  placeholder="Any special requests or information we should know..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={
                    !formData.service ||
                    !formData.duration ||
                    !formData.date ||
                    !selectedTime ||
                    totalPrice === 0
                  }
                  className="flex-1 bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Continue to Payment Options
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-white text-amber-700 px-6 py-3 rounded-lg font-semibold border-2 border-amber-700 hover:bg-amber-50 transform hover:scale-105 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
