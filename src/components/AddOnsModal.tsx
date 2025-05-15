import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

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
  onAddOnsSelected?: (selectedAddOns: AddOn[]) => void;
  onContinue?: (selectedAddOns: AddOn[]) => void;
}

export default function AddOnsModal({
  isOpen,
  onClose,
  addOns,
  onAddOnsSelected,
  onContinue,
}: AddOnsModalProps) {
  const [expandedAddOn, setExpandedAddOn] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);

  const toggleExpand = (addOnId: string) => {
    setExpandedAddOn(expandedAddOn === addOnId ? null : addOnId);
  };

  const toggleAddOn = (addOn: AddOn) => {
    setSelectedAddOns((prev) => {
      const isSelected = prev.some((item) => item.id === addOn.id);
      const newSelection = isSelected
        ? prev.filter((item) => item.id !== addOn.id)
        : [...prev, addOn];

      // Call the callback if provided
      onAddOnsSelected?.(newSelection);
      return newSelection;
    });
  };

  const handleContinue = () => {
    onContinue?.(selectedAddOns);
    onClose();
  };

  const isSelected = (addOnId: string) => {
    return selectedAddOns.some((addOn) => addOn.id === addOnId);
  };

  const totalAddOnsPrice = selectedAddOns.reduce(
    (sum, addOn) => sum + addOn.price,
    0
  );

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
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-semibold leading-6 text-gray-900 mb-4"
                    >
                      Available Add-Ons
                    </Dialog.Title>
                    <div className="mt-4">
                      <div className="grid grid-cols-1 gap-4">
                        {addOns.map((addOn) => (
                          <div
                            key={addOn.id}
                            className={`bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all ${
                              isSelected(addOn.id)
                                ? "ring-2 ring-green-500 bg-green-50/50"
                                : "hover:bg-gray-50/80"
                            }`}
                          >
                            <div className="flex items-center">
                              <button
                                onClick={() => toggleAddOn(addOn)}
                                className="flex-1 flex items-center justify-between p-4 transition-colors"
                              >
                                <div className="flex items-center space-x-3">
                                  {isSelected(addOn.id) && (
                                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                  )}
                                  <span
                                    className={`font-medium ${
                                      isSelected(addOn.id)
                                        ? "text-green-700"
                                        : "text-gray-900"
                                    }`}
                                  >
                                    {addOn.name}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <span
                                    className={`font-semibold ${
                                      isSelected(addOn.id)
                                        ? "text-green-700"
                                        : "text-amber-700"
                                    }`}
                                  >
                                    +${addOn.price}
                                  </span>
                                </div>
                              </button>
                              <button
                                onClick={() => toggleExpand(addOn.id)}
                                className="p-4 hover:bg-gray-50/80 transition-colors"
                              >
                                {expandedAddOn === addOn.id ? (
                                  <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                                ) : (
                                  <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                                )}
                              </button>
                            </div>
                            {expandedAddOn === addOn.id && (
                              <div className="px-4 pb-4">
                                <p className="text-gray-600 text-sm">
                                  {addOn.description}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Continue Button */}
                {selectedAddOns.length > 0 && (
                  <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4 sm:relative sm:border-0 sm:mt-6 sm:bg-transparent">
                    <div className="max-w-lg mx-auto">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600">
                            Selected Add-Ons:
                          </span>
                          <span className="text-green-700 font-semibold">
                            {selectedAddOns.length} selected
                          </span>
                        </div>
                        <span className="text-amber-700 font-semibold">
                          +${totalAddOnsPrice}
                        </span>
                      </div>
                      <button
                        onClick={handleContinue}
                        className="w-full bg-amber-700 text-white px-4 py-3 rounded-md hover:bg-amber-800 transition-colors font-medium"
                      >
                        Continue with Selected Add-Ons
                      </button>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
