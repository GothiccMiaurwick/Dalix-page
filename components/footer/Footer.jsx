import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 sm:py-8 md:py-10 lg:py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center">
          {/* Company Name */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-gray-300 mb-4 sm:mb-5 md:mb-6 tracking-wider">
            DALIX
          </h2>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-3 sm:gap-4 md:gap-5 mb-6 sm:mb-7 md:mb-8">
            <a
              href="#"
              className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-gray-300 rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110 cursor-pointer"
              aria-label="Facebook"
            >
              <img
                src="https://img.icons8.com/ios-filled/50/facebook-new.png"
                alt="Facebook"
                className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6"
              />
            </a>
            <a
              href="#"
              className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-gray-300 rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110 cursor-pointer"
              aria-label="Instagram"
            >
              <img
                src="https://img.icons8.com/ios-filled/50/instagram-new.png"
                alt="Instagram"
                className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6"
              />
            </a>
            <a
              href="#"
              className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-gray-300 rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110 cursor-pointer"
              aria-label="Twitter"
            >
              <img
                src="https://img.icons8.com/ios-filled/50/twitter.png"
                alt="Twitter"
                className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6"
              />
            </a>
            <a
              href="#"
              className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-gray-300 rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110 cursor-pointer"
              aria-label="Pinterest"
            >
              <img
                src="https://img.icons8.com/ios-filled/50/pinterest.png"
                alt="Pinterest"
                className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6"
              />
            </a>
          </div>

          {/* Contact Information */}
          <div className="space-y-3 sm:space-y-4">
            {/* Address */}
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <p className="text-xs sm:text-sm md:text-base font-sans">
                Calle 5g#48-64 Barrio La Nevada
              </p>
            </div>

            {/* Phone */}
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <a
                href="tel:+57800000000"
                className="text-xs sm:text-sm md:text-base font-sans hover:text-white transition-colors"
              >
                +57 800 000 000
              </a>
            </div>

            {/* Email */}
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <a
                href="mailto:dalixprendas@gmail.com"
                className="text-xs sm:text-sm md:text-base font-sans hover:text-white transition-colors break-all sm:break-normal"
              >
                dalixprendas@gmail.com
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-700">
            <p className="text-xs sm:text-sm text-gray-400">
              © {new Date().getFullYear()} DALIX. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
