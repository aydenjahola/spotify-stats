import React from "react";

interface ButtonProps {
  onClick: () => void;
  isLoading: boolean;
  success: boolean | null;
  text: string;
  className?: string;
}

export default function Button({
  onClick,
  isLoading,
  success,
  text,
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`px-6 py-3 rounded-lg text-white font-semibold transition duration-300 ease-in-out transform hover:scale-105 ${
        success === true
          ? "bg-green-500 hover:bg-green-600"
          : success === false
          ? "bg-red-500 hover:bg-red-600"
          : "bg-blue-500 hover:bg-blue-600"
      } ${className}`}
    >
      {isLoading
        ? `${text}...`
        : success === true
        ? `${text}d!`
        : success === false
        ? `Failed to ${text}`
        : text}
    </button>
  );
}
