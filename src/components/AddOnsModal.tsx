"use client";

import { useState } from "react";
import { X, Plus, Minus } from "lucide-react";

interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface AddOnsModalProps {
  isOpen: boolean;
  onClose: () => void;
  addOns: AddOn[];
  onAddOnsSelected: (addOns: AddOn[]) => void;
  onContinue: (addOns: AddOn[]) => void;
}

export default function AddOnsModal({
  isOpen,
  onClose,
  addOns,
  onAddOnsSelected,
  onContinue,
}: AddOnsModalProps) {
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);

  const handleAddOnToggle = (addOn: AddOn) => {
    setSelectedAddOns((prev) => {
      const isSelected = prev.some((selected) => selected.id === addOn.id);
      if (isSelected) {
        return prev.filter((selected) => selected.id !== addOn.id);
      } else {
        return [...prev, addOn];
      }
    });
  };

  const handleContinue = () => {
    onAddOnsSelected(selectedAddOns);
    onContinue(selectedAddOns);
  };

  const totalPrice = selectedAddOns.reduce(
    (sum, addOn) => sum + addOn.price,
    0
  );

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
        className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in transform"
        style={{
          margin: "auto",
          position: "relative",
          zIndex: 51,
        }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Enhance Your Experience</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Add-ons List */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Available Enhancements
              </h3>
              <div className="space-y-4">
                {addOns.map((addOn) => {
                  const isSelected = selectedAddOns.some(
                    (selected) => selected.id === addOn.id
                  );

                  return (
                    <div
                      key={addOn.id}
                      className={`bg-white rounded-xl shadow-lg p-4 cursor-pointer transition-all duration-300 border border-gray-100 hover:border-amber-200 ${
                        isSelected
                          ? "ring-2 ring-amber-500 bg-amber-50"
                          : "hover:shadow-xl transform hover:-translate-y-1"
                      }`}
                      onClick={() => handleAddOnToggle(addOn)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">
                              {addOn.name}
                            </h4>
                            <span className="text-amber-700 font-bold">
                              ${addOn.price}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            {addOn.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddOnToggle(addOn);
                              }}
                              className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ${
                                isSelected
                                  ? "bg-amber-700 text-white hover:bg-amber-800"
                                  : "bg-gray-100 text-gray-600 hover:bg-amber-100 hover:text-amber-700"
                              }`}
                            >
                              {isSelected ? (
                                <Minus size={16} />
                              ) : (
                                <Plus size={16} />
                              )}
                            </button>
                            <span
                              className={`text-sm font-medium ${
                                isSelected ? "text-amber-700" : "text-gray-500"
                              }`}
                            >
                              {isSelected ? "Selected" : "Add to session"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary */}
            <div className="lg:pl-6 lg:border-l lg:border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Session Summary
              </h3>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-900 mb-3">
                  Selected Enhancements
                </h4>

                {selectedAddOns.length === 0 ? (
                  <p className="text-gray-500 text-sm italic">
                    No enhancements selected yet
                  </p>
                ) : (
                  <div className="space-y-3">
                    {selectedAddOns.map((addOn) => (
                      <div
                        key={addOn.id}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <span className="text-sm font-medium text-gray-700">
                            {addOn.name}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            {addOn.description}
                          </p>
                        </div>
                        <span className="text-amber-700 font-semibold">
                          ${addOn.price}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-900 mb-3">
                  Price Breakdown
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Base Service:</span>
                    <span className="text-gray-900">$120 - $180</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Enhancements:</span>
                    <span className="text-amber-700">+${totalPrice}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">
                        Total Enhancement Cost:
                      </span>
                      <span className="text-xl font-bold text-amber-700">
                        ${totalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-amber-900 mb-3">
                  Why Add Enhancements?
                </h4>
                <ul className="space-y-2 text-sm text-amber-800">
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">✨</span>
                    Enhanced relaxation and stress relief
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">✨</span>
                    Targeted muscle tension relief
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">✨</span>
                    Improved circulation and recovery
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">✨</span>
                    Personalized wellness experience
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleContinue}
                  disabled={selectedAddOns.length === 0}
                  className="w-full bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Continue with {selectedAddOns.length} Enhancement
                  {selectedAddOns.length !== 1 ? "s" : ""}
                </button>
                <button
                  onClick={onClose}
                  className="w-full bg-white text-amber-700 px-6 py-3 rounded-lg font-semibold border-2 border-amber-700 hover:bg-amber-50 transform hover:scale-105 transition-all duration-300"
                >
                  Skip Enhancements
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
