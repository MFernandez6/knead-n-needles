"use client";

import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessPage() {
  const [status, setStatus] = useState<string>("processing");

  useEffect(() => {
    // Check payment status from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const paymentIntent = urlParams.get("payment_intent");
    const paymentIntentClientSecret = urlParams.get(
      "payment_intent_client_secret"
    );

    if (paymentIntent && paymentIntentClientSecret) {
      // Payment was successful
      setStatus("success");
    } else {
      setStatus("error");
    }
  }, []);

  if (status === "processing") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your payment...</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Payment Error
          </h1>
          <p className="text-gray-600 mb-6">
            There was an issue processing your payment. Please try again or
            contact us for assistance.
          </p>
          <Link
            href="/"
            className="inline-block bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-800 transform hover:scale-105 transition-all duration-300"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Your payment has been processed successfully. You&apos;ll receive a
          confirmation email shortly with your booking details.
        </p>
        <div className="bg-amber-50 rounded-lg p-4 mb-6 text-sm text-amber-800">
          <p className="font-medium mb-2">What happens next?</p>
          <ul className="space-y-1 text-left">
            <li>• Check your email for booking confirmation</li>
            <li>• Look in spam/junk folder if needed</li>
            <li>• We&apos;ll contact you 24 hours before your appointment</li>
          </ul>
        </div>
        <Link
          href="/"
          className="inline-block bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-800 transform hover:scale-105 transition-all duration-300"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
