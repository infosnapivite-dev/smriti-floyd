import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function WardrobeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const themes = [
    {
      event: 'Haldi',
      vibe: 'Sun-kissed florals & breezy cotton/silk',
      colors: ['#f59e0b', '#fbbf24', '#fef08a'],
      suggestions: 'Yellow kurtas, floral lehengas, breezy shararas, vibrant dupattas.',
    },
    {
      event: 'Sangeet',
      vibe: 'Glitz, mirror-work & high glamour',
      colors: ['#0f172a', '#3b0764', '#f43f5e'],
      suggestions: 'Tuxedos, metallic sherwanis, sequin lehengas, statement gowns.',
    },
    {
      event: 'Pheras',
      vibe: 'Regal heritage & auspicious pastels',
      colors: ['#f43f5e', '#fed7aa', '#c5a059'],
      suggestions: 'Pastel pinks, blush gold, ivory sherwanis with safa, traditional banarasi weaves.',
    },
    {
      event: 'Reception',
      vibe: 'Modern classic & formal sophistication',
      colors: ['#1e293b', '#0369a1', '#e2e8f0'],
      suggestions: 'Black tie, dark suits, evening gowns, contemporary silk sarees.',
    },
  ];

  const modalContent = (
    <AnimatePresence>
      <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-sm max-h-[85vh] overflow-y-auto rounded-2xl p-6 shadow-2xl border border-[#c5a059]/40 bg-[#fbf8f2] text-center"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/10 flex items-center justify-center text-[#2c3e50] hover:bg-black/20"
          >
            ✕
          </button>

          <span className="font-serif text-[11px] uppercase tracking-[0.25em] text-[#916a3c] font-semibold block mb-1">
            Wardrobe Lookbook
          </span>
          <h3 className="font-serif text-2xl font-semibold text-[#183654] mb-4">
            Curated Color Palettes
          </h3>

          <div className="space-y-4 text-left">
            {themes.map((t, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white border border-[#916a3c]/20 shadow-sm">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-serif text-base font-bold text-[#916a3c] uppercase">{t.event}</h4>
                  <div className="flex gap-1.5">
                    {t.colors.map((c, i) => (
                      <span
                        key={i}
                        className="w-4 h-4 rounded-full border border-black/10 shadow-inner"
                        style={{ backgroundColor: c }}
                        title={c}
                      />
                    ))}
                  </div>
                </div>
                <p className="font-serif italic text-xs text-[#183654] mb-1">{t.vibe}</p>
                <p className="font-serif text-[11px] text-gray-600 leading-snug">{t.suggestions}</p>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="mt-5 px-6 py-2 rounded-full bg-[#183654] text-white font-serif text-xs tracking-widest uppercase hover:bg-[#916a3c] transition-colors"
          >
            Got It
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
