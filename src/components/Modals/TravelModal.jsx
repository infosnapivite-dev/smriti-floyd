import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function TravelModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const modalContent = (
    <AnimatePresence>
      <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-sm max-h-[85vh] overflow-y-auto rounded-2xl p-6 shadow-2xl border border-[#c5a059]/40 bg-[#fbf8f2] text-center"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/10 flex items-center justify-center text-[#2c3e50] hover:bg-black/20"
          >
            ✕
          </button>

          <span className="font-serif text-[11px] uppercase tracking-[0.25em] text-[#916a3c] font-semibold block mb-1">
            Travel & Hospitality Guide
          </span>
          <h3 className="font-serif text-2xl font-semibold text-[#183654] mb-3">
            Taj Mussoorie Foothills
          </h3>

          <div className="space-y-3 text-left font-serif text-xs text-[#2c3e50] bg-white/80 p-4 rounded-xl border border-[#916a3c]/20">
            <div>
              <span className="font-semibold text-[#916a3c] block uppercase tracking-wider text-[10px]">✈️ By Air (Flight):</span>
              <p className="text-gray-700">Jolly Grant Airport (DED), Dehradun is approximately 45 km (1 hour drive) from the resort.</p>
            </div>
            <div className="border-t border-black/5 pt-2">
              <span className="font-semibold text-[#916a3c] block uppercase tracking-wider text-[10px]">🚆 By Rail (Train):</span>
              <p className="text-gray-700">Dehradun Railway Station (DDN) is connected with major express trains, approx 18 km from the resort.</p>
            </div>
            <div className="border-t border-black/5 pt-2">
              <span className="font-semibold text-[#916a3c] block uppercase tracking-wider text-[10px]">🏨 Guest Stay & Shuttles:</span>
              <p className="text-gray-700">Complimentary guest shuttles will be running from Dehradun airport & railway station on 18th morning.</p>
            </div>
            <div className="border-t border-black/5 pt-2 text-center">
              <a
                href="https://maps.google.com/?q=Taj+Mussoorie+Foothills+Dehradun"
                target="_blank"
                rel="noreferrer"
                className="inline-block px-4 py-2 rounded-full bg-[#183654] text-white text-xs font-serif tracking-widest uppercase hover:bg-[#916a3c] transition-colors shadow"
              >
                Open Google Maps Location
              </a>
            </div>
          </div>

          <button
            onClick={onClose}
            className="mt-4 px-6 py-2 rounded-full bg-[#183654] text-white font-serif text-xs tracking-widest uppercase hover:bg-[#916a3c] transition-colors"
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
