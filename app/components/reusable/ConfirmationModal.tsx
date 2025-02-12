"use client";
import { useEffect } from "react";
import { Button } from "./Button";

interface ModalProps {
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({
  title = "Are you sure?",
  message,
  onConfirm,
  onCancel,
}: ModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-gradient-to-tr from-white to-yellow-100 via-yellow-50 text-gray-900 space-y-4">
        {/* Title */}
        <h2 className="text-xl font-bold text-center">{title}</h2>
        {/* Message */}
        {message && <p className="text-md text-center">{message}</p>}

        {/* Buttons */}
        <div className="mt-4 flex justify-center gap-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="default" onClick={onConfirm}>
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
}
