import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, MessageCircle } from 'lucide-react';

export default function TravelModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const modalContent = (
    <AnimatePresence>
      <div 
        className="absolute inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm pointer-events-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[340px] sm:max-w-[370px] rounded-2xl p-4 sm:p-5 shadow-2xl border border-[#c5a059]/40 bg-[#fbf8f2] text-center overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/10 flex items-center justify-center text-[#2c3e50] hover:bg-black/20 transition-colors text-xs"
            aria-label="Close modal"
          >
            ✕
          </button>

          <span className="font-serif text-[9.5px] uppercase tracking-[0.22em] text-[#916a3c] font-semibold block mb-0.5">
            Travel & Hospitality Guide
          </span>
          <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#183654] leading-tight mb-0.5">
            Taj Mussoorie Foothills
          </h3>
          <p className="font-serif italic text-[10.5px] text-[#8b5a2b] mb-2.5">
            Our concierge looks forward to welcoming you!
          </p>

          <div className="space-y-2 text-left font-serif bg-white/85 p-3 sm:p-3.5 rounded-xl border border-[#916a3c]/20 shadow-sm">
            {/* By Air */}
            <div>
              <span className="font-semibold text-[#916a3c] block uppercase tracking-wider text-[9px] mb-0.5">
                ✈️ By Air (Flight)
              </span>
              <p className="text-gray-700 leading-snug text-[10px] sm:text-[10.5px]">
                The nearest airport is Jolly Grant Airport, Dehradun (DED), approximately 55 minutes from the property by road.
              </p>
            </div>

            {/* By Rail */}
            <div className="border-t border-[#916a3c]/15 pt-1.5">
              <span className="font-semibold text-[#916a3c] block uppercase tracking-wider text-[9px] mb-0.5">
                🚆 By Rail (Train)
              </span>
              <p className="text-gray-700 leading-snug text-[10px] sm:text-[10.5px]">
                The nearest railway station is Dehradun Railway Station (DDN), approximately 45 minutes from the property by road.
              </p>
            </div>

            {/* By Road */}
            <div className="border-t border-[#916a3c]/15 pt-1.5">
              <span className="font-semibold text-[#916a3c] block uppercase tracking-wider text-[9px] mb-0.5">
                🚗 By Road (Car)
              </span>
              <p className="text-gray-700 leading-snug text-[10px] sm:text-[10.5px]">
                The drive from Jaipur to Dehradun via NE 4 and the Delhi-Dehradun Expressway takes approximately 7-8 hours.
              </p>
            </div>

            {/* Location */}
            <div className="border-t border-[#916a3c]/15 pt-1.5">
              <span className="font-semibold text-[#916a3c] block uppercase tracking-wider text-[9px] mb-0.5">
                📍 Location
              </span>
              <p className="text-[#183654] font-medium mb-1.5 text-[10px] sm:text-[10.5px]">
                Taj Mussoorie Foothills, Dehradun
              </p>
              <a
                href="https://maps.google.com/?q=Taj+Mussoorie+Foothills+Dehradun"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-full bg-[#183654] text-white text-[9.5px] font-serif tracking-widest uppercase hover:bg-[#916a3c] transition-colors shadow-sm text-center"
              >
                <MapPin className="w-3 h-3 text-[#c5a059] shrink-0" />
                <span>Open in Google Maps</span>
              </a>
            </div>

            {/* Contact Our Team */}
            <div className="border-t border-[#916a3c]/15 pt-1.5">
              <span className="font-semibold text-[#916a3c] block uppercase tracking-wider text-[9px] mb-0.5">
                💬 Contact Our Team
              </span>
              <p className="text-gray-700 leading-snug mb-1.5 text-[10px] sm:text-[10.5px]">
                For any assistance, please feel free to reach out to our team. Our event coordination team will assist with guest transfers.
              </p>
              <a
                href="https://wa.me/919220104962"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-full bg-[#1e3a58] text-white text-[9.5px] font-serif tracking-widest uppercase hover:bg-[#15293e] transition-colors shadow-sm border border-[#c5a059]/30 text-center"
              >
                <MessageCircle className="w-3 h-3 text-[#25D366] shrink-0" />
                <span>WhatsApp: +91 92201 04962</span>
              </a>
            </div>
          </div>

          <button
            onClick={onClose}
            className="mt-3 px-6 py-1.5 rounded-full bg-[#183654] text-white font-serif text-[11px] tracking-widest uppercase hover:bg-[#916a3c] transition-colors shadow-sm"
          >
            Close
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  const modalRoot = typeof document !== 'undefined' ? document.getElementById('modal-root') : null;
  if (modalRoot) {
    return createPortal(modalContent, modalRoot);
  }
  return modalContent;
}
