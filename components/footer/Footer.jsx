import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Company Name */}
        <h2 className="text-2xl font-serif text-gray-300 mb-6 tracking-wider">
          DALIX
        </h2>
        
        {/* Social Media Icons */}
        <div className="flex justify-center gap-4 mb-6">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer">
            <img 
              src="https://img.icons8.com/ios-filled/50/facebook-new.png" 
              alt="Facebook" 
              className="w-5 h-5"
            />
          </div>
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer">
            <img 
              src="https://img.icons8.com/ios-filled/50/instagram-new.png" 
              alt="Instagram" 
              className="w-5 h-5"
            />
          </div>
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer">
            <img 
              src="https://img.icons8.com/ios-filled/50/twitter.png" 
              alt="Twitter" 
              className="w-5 h-5"
            />
          </div>
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer">
            <img 
              src="https://img.icons8.com/ios-filled/50/pinterest.png" 
              alt="Pinterest" 
              className="w-5 h-5"
            />
          </div>
        </div>
        
        {/* Address */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <MapPin className="w-4 h-4" />
          <p className="text-sm font-sans">Calle 5g#48-64 Barrio La Nevada</p>
        </div>
        
        {/* Phone */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <Phone className="w-4 h-4" />
          <p className="text-sm font-sans">+57 800 000 000</p>
        </div>
        
        {/* Email */}
        <div className="flex items-center justify-center gap-2">
          <Mail className="w-4 h-4" />
          <p className="text-sm font-sans">dalixprendas@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}
