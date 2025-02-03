"use client";
import { useEffect } from "react";
import { Button } from "./Button";

interface ModalProps {
  message: string;
  onClose: () => void;
}

export default function Modal({ message, onClose }: ModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-gradient-to-tr from-white to-yellow-100 via-yellow-50 text-gray-900">
        {/* Message */}
        <p className="text-lg font-medium text-center">{message}</p>

        {/* Close Button */}
        <div className="mt-4 flex justify-center">
          <Button variant="default" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
