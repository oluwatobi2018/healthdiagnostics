import React from "react";

const Button = ({ 
  children, 
  onClick, 
  type = "button", 
  variant = "primary", 
  disabled = false, 
  isLoading = false,
  className = "" 
}) => {
  const baseStyles = "px-4 py-2 rounded-lg font-semibold transition-all duration-300";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;
