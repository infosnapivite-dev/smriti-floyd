import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import haldiFullBg from '../../assets/haldi page.webp';
import sangeetFullBg from '../../assets/sangeet page.webp';
import pherasFullBg from '../../assets/pheras.webp';
import receptionFullBg from '../../assets/reception.webp';
import deviderImg from '../../assets/devider.webp';

// Orchestrated staggered animation variants for each detail element
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.1,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const dateVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const timeVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const dividerVariants = {
  hidden: { opacity: 0, scaleX: 0.3 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const venueVariants = {
  hidden: { opacity: 0, y: 12, letterSpacing: '0.1em' },
  visible: {
    opacity: 1,
    y: 0,
    letterSpacing: '0.2em',
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const locationVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function EventDetailModal({ event, onClose }) {
  if (!event) return null;

  // Background map per event
  const bgMap = {
    haldi: haldiFullBg,
    sangeet: sangeetFullBg,
    pheras: pherasFullBg,
    reception: receptionFullBg,
  };

  const currentBg = bgMap[event.id] || haldiFullBg;

  const modalContent = (
    <AnimatePresence>
      <motion.div
        key="full-event-page"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-50 w-full h-full bg-[#f4ece1] overflow-hidden select-none pointer-events-auto"
      >
        {/* Full-Page Event Backdrop Artwork */}
        <div className="relative w-full h-full aspect-[3000/5400] max-h-full mx-auto overflow-hidden">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            src={currentBg}
            alt={`${event.title} Celebration`}
            className="w-full h-full object-fill pointer-events-none"
            loading="eager"
          />

          {/* Top-Right Close 'X' Button to return to parent page */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            onPointerUp={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-black/45 hover:bg-black/70 active:scale-90 text-white backdrop-blur-md flex items-center justify-center shadow-lg border border-white/25 transition-all cursor-pointer pointer-events-auto"
            aria-label="Close"
            title="Close"
          >
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Typography & Elements Layout as per Reference Images with Individual Appearing Animations */}

          {/* 1. HALDI LAYOUT (Top-Right Placement) */}
          {event.id === 'haldi' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="absolute top-[9.5%] right-0 w-[50%] flex flex-col items-center text-center pointer-events-none pr-3 sm:pr-4"
            >
              <motion.h1
                variants={titleVariants}
                className="font-script text-5xl sm:text-6xl text-[#b02263] leading-none mb-2"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                Haldi
              </motion.h1>
              <motion.p
                variants={dateVariants}
                className="font-serif text-[15px] sm:text-[17px] font-semibold text-[#143d6a] tracking-[0.14em] uppercase leading-none"
              >
                <span className="font-numbers">18</span><sup className="text-[0.62em] lowercase font-normal align-super ml-0.5 mr-1">th</sup>JANUARY
              </motion.p>
              <motion.p
                variants={timeVariants}
                className="font-serif text-[11px] sm:text-[12px] font-semibold text-[#143d6a] tracking-[0.12em] uppercase mt-1"
              >
                <span className="font-numbers">1:30</span> PM ONWARDS
              </motion.p>
              <motion.img
                variants={dividerVariants}
                src={deviderImg}
                alt="Divider"
                className="w-20 object-contain my-2 opacity-90 origin-center"
              />
              <motion.p
                variants={venueVariants}
                className="font-serif text-xs sm:text-sm font-bold text-[#143d6a] tracking-[0.2em] uppercase"
              >
                THE DECK
              </motion.p>
              <motion.p
                variants={locationVariants}
                className="font-serif text-[10.5px] sm:text-[11.5px] text-[#143d6a] font-medium leading-tight mt-0.5"
              >
                Taj Mussoorie Foothills,<br />Dehradun
              </motion.p>
            </motion.div>
          )}

          {/* 2. SANGEET LAYOUT (Top-Center Placement above Circular Chandelier) */}
          {event.id === 'sangeet' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="absolute top-[1.6%] inset-x-0 flex flex-col items-center text-center px-4 pointer-events-none"
            >
              <motion.h1
                variants={titleVariants}
                className="font-script text-[42px] sm:text-[50px] text-[#e8b668] leading-none mb-1 drop-shadow-md"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                Sangeet
              </motion.h1>
              <motion.p
                variants={dateVariants}
                className="font-serif text-[13px] sm:text-[14.5px] font-semibold text-white tracking-[0.14em] uppercase leading-none drop-shadow-sm"
              >
                <span className="font-numbers">18</span><sup className="text-[0.62em] lowercase font-normal align-super ml-0.5 mr-1">th</sup>JANUARY
              </motion.p>
              <motion.p
                variants={timeVariants}
                className="font-serif text-[9.5px] sm:text-[10.5px] font-semibold text-white/95 tracking-[0.12em] uppercase mt-0.5 drop-shadow-sm"
              >
                <span className="font-numbers">7:30</span> PM ONWARDS
              </motion.p>
              <motion.img
                variants={dividerVariants}
                src={deviderImg}
                alt="Divider"
                className="w-16 object-contain my-1.5 filter brightness-125 origin-center"
              />
              <motion.p
                variants={venueVariants}
                className="font-serif text-[10.5px] sm:text-[12px] font-bold text-white tracking-[0.2em] uppercase drop-shadow-sm"
              >
                MONAL
              </motion.p>
              <motion.p
                variants={locationVariants}
                className="font-serif text-[9px] sm:text-[10px] text-white/95 font-medium leading-tight mt-0.5 drop-shadow-sm"
              >
                Taj Mussoorie Foothills,<br />Dehradun
              </motion.p>
            </motion.div>
          )}

          {/* 3. PHERAS LAYOUT (Top-Center Sky Placement above Sacred Banyan Tree) */}
          {event.id === 'pheras' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="absolute top-[2.8%] inset-x-0 flex flex-col items-center text-center px-4 pointer-events-none"
            >
              <motion.h1
                variants={titleVariants}
                className="font-script text-5xl sm:text-6xl text-[#8b1528] leading-none mb-1.5"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                Pheras
              </motion.h1>
              <motion.p
                variants={dateVariants}
                className="font-serif text-[15px] sm:text-[17px] font-semibold text-[#1f3d59] tracking-[0.14em] uppercase leading-none"
              >
                <span className="font-numbers">19</span><sup className="text-[0.62em] lowercase font-normal align-super ml-0.5 mr-1">th</sup>JANUARY
              </motion.p>
              <motion.p
                variants={timeVariants}
                className="font-serif text-[11px] sm:text-[12px] font-semibold text-[#1f3d59] tracking-[0.12em] uppercase mt-1"
              >
                <span className="font-numbers">11:30</span> AM ONWARDS
              </motion.p>
              <motion.img
                variants={dividerVariants}
                src={deviderImg}
                alt="Divider"
                className="w-20 object-contain my-2 opacity-90 origin-center"
              />
              <motion.p
                variants={venueVariants}
                className="font-serif text-xs sm:text-sm font-bold text-[#1f3d59] tracking-[0.2em] uppercase"
              >
                THE WOODS
              </motion.p>
              <motion.p
                variants={locationVariants}
                className="font-serif text-[10.5px] sm:text-[11.5px] text-[#1f3d59] font-medium leading-tight mt-0.5"
              >
                Taj Mussoorie Foothills,<br />Dehradun
              </motion.p>
            </motion.div>
          )}

          {/* 4. RECEPTION LAYOUT (Middle Backdrop Wall Placement) */}
          {event.id === 'reception' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="absolute top-[37%] inset-x-0 flex flex-col items-center text-center px-6 pointer-events-none"
            >
              <motion.h1
                variants={titleVariants}
                className="font-script text-5xl sm:text-6xl text-[#731622] leading-none mb-1.5"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                Reception
              </motion.h1>
              <motion.p
                variants={dateVariants}
                className="font-serif text-[15px] sm:text-[17px] font-semibold text-[#3e2c1e] tracking-[0.14em] uppercase leading-none"
              >
                <span className="font-numbers">19</span><sup className="text-[0.62em] lowercase font-normal align-super ml-0.5 mr-1">th</sup>JANUARY
              </motion.p>
              <motion.p
                variants={timeVariants}
                className="font-serif text-[11px] sm:text-[12px] font-semibold text-[#3e2c1e] tracking-[0.12em] uppercase mt-1"
              >
                <span className="font-numbers">7:30</span> PM ONWARDS
              </motion.p>
              <motion.img
                variants={dividerVariants}
                src={deviderImg}
                alt="Divider"
                className="w-20 object-contain my-2 opacity-80 origin-center"
              />
              <motion.p
                variants={venueVariants}
                className="font-serif text-xs sm:text-sm font-bold text-[#3e2c1e] tracking-[0.2em] uppercase"
              >
                MONAL
              </motion.p>
              <motion.p
                variants={locationVariants}
                className="font-serif text-[10.5px] sm:text-[11.5px] text-[#3e2c1e] font-medium leading-tight mt-0.5"
              >
                Taj Mussoorie Foothills,<br />Dehradun
              </motion.p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );

  const modalRoot = typeof document !== 'undefined' ? document.getElementById('modal-root') : null;
  if (modalRoot) {
    return createPortal(modalContent, modalRoot);
  }
  return modalContent;
}
