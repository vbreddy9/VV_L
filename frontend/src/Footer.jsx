import React from "react";

const Footer = () => {
  return (
    <footer className="py-4 px-4 bg-orange-200 text-black text-center w-full overflow-hidden">
      <p className="text-sm md:text-base font-medium whitespace-nowrap">
        Copyright © 2025 | Vidhyavaaradhi Overseas Consultancy.
      </p>

      {/* Links Section */}
      <div className="mt-2 flex justify-center items-center space-x-2 md:space-x-4">
        <a href="/privacy-policy" className="text-black hover:underline text-sm md:text-base">
          Privacy Policy
        </a>
        <span className="text-black">|</span>
        <a href="/terms-and-conditions" className="text-black hover:underline text-sm md:text-base">
          Terms & Conditions
        </a>
      </div>
    </footer>
  );
};

export default Footer;
