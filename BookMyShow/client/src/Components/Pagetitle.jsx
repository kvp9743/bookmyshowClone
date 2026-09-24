import React from "react";

const Pagetitle = ({ title, subtitle }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 rounded-full bg-[#DF1827]" />

        <h1 className="text-2xl font-bold tracking-tight text-gray-800">
          {title}
        </h1>
      </div>

      {subtitle && (
        <p className="mt-2 ml-4 text-sm text-gray-500">{subtitle}</p>
      )}
    </div>
  );
};

export default Pagetitle;
