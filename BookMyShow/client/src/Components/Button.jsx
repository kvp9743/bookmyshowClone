import React from "react";

const Button = ({
  title,
  onClick,
  variant = "filled",
  disabled = false,
  fullwidth = false,
  type = "button",
}) => {
  const baseStyles =
    "flex items-center justify-center rounded-md px-5 py-2.5 text-base font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#DF1827]/30 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    filled:
      "border border-[#DF1827] bg-[#DF1827] text-white hover:bg-[#c91422] hover:border-[#c91422] active:scale-[0.98]",

    outlined:
      "border border-[#DF1827] bg-transparent text-[#DF1827] hover:bg-[#DF1827] hover:text-white active:scale-[0.98]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${
        fullwidth ? "w-full" : ""
      }`}
    >
      {title}
    </button>
  );
};

export default Button;
