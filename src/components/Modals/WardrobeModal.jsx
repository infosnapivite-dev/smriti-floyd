import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import wardrobe1 from '../../assets/wardrobe images/1.jpg.webp';
import wardrobe2 from '../../assets/wardrobe images/2.jpg.webp';
import wardrobe3 from '../../assets/wardrobe images/3.jpg.webp';
import wardrobe4 from '../../assets/wardrobe images/4.jpg.webp';
import wardrobe5 from '../../assets/wardrobe images/5.jpg.webp';

const wardrobeSlides = [
  { id: 1, src: wardrobe1, alt: 'Wardrobe Planner - Look 1' },
  { id: 2, src: wardrobe2, alt: 'Wardrobe Planner - Look 2' },
  { id: 3, src: wardrobe3, alt: 'Wardrobe Planner - Look 3' },
  { id: 4, src: wardrobe4, alt: 'Wardrobe Planner - Look 4' },
  { id: 5, src: wardrobe5, alt: 'Wardrobe Planner - Look 5' },
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0.3,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.25 },
    },
  },
  exit: (direction) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0.3,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default function WardrobeModal({ isOpen, onClose }) {
  const [[page, direction], setPage] = useState([0, 0]);

  // Reset to first slide whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setPage([0, 0]);
    }
  }, [isOpen]);

  // Keyboard arrow keys navigation & Escape to close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        paginate(1);
      } else if (e.key === 'ArrowLeft') {
        paginate(-1);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, page]);

  if (!isOpen) return null;

  const paginate = (newDirection) => {
    setPage(([prevPage]) => {
      const next = (prevPage + newDirection + wardrobeSlides.length) % wardrobeSlides.length;
      return [next, newDirection];
    });
  };

  const goToSlide = (targetIndex) => {
    setPage(([prevPage]) => {
      const newDirection = targetIndex > prevPage ? 1 : -1;
      return [targetIndex, newDirection];
    });
  };

  const currentSlide = wardrobeSlides[page];

  const modalContent = (
    <AnimatePresence>
      <motion.div
        key="wardrobe-carousel-full-page"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-50 w-full h-full bg-[#f4ece1] overflow-hidden select-none pointer-events-auto"
      >
        {/* Full-Page Viewport Container Matching Screen Aspect Ratio */}
        <div 
          className="relative w-full h-full aspect-[3000/5400] max-h-full mx-auto overflow-hidden bg-[#f4ece1]"
        >
          {/* Sliding Carousel Images */}
          <div className="relative w-full h-full overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
              >
                <img
                  src={currentSlide.src}
                  alt={currentSlide.alt}
                  className="w-full h-full object-fill pointer-events-none select-none"
                  loading="eager"
                  decoding="async"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              paginate(-1);
            }}
            className="absolute left-3 sm:left-3.5 -translate-y-1/2 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/20 hover:bg-black/40 active:scale-90 text-white/85 hover:text-white backdrop-blur-[2px] flex items-center justify-center shadow-sm border border-white/20 transition-all cursor-pointer pointer-events-auto"
            style={{ top: 'calc(58% + 20px)' }}
            aria-label="Previous Slide"
            title="Previous"
          >
            <ChevronLeft className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2]" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              paginate(1);
            }}
            className="absolute right-3 sm:right-3.5 -translate-y-1/2 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/20 hover:bg-black/40 active:scale-90 text-white/85 hover:text-white backdrop-blur-[2px] flex items-center justify-center shadow-sm border border-white/20 transition-all cursor-pointer pointer-events-auto"
            style={{ top: 'calc(58% + 20px)' }}
            aria-label="Next Slide"
            title="Next"
          >
            <ChevronRight className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2]" />
          </button>

          {/* Top-Right Close 'X' Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-black/45 hover:bg-black/70 active:scale-90 text-white backdrop-blur-md flex items-center justify-center shadow-lg border border-white/25 transition-all cursor-pointer pointer-events-auto"
            aria-label="Close"
            title="Close"
          >
            <X className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Bottom Dot Indicators */}
          <div 
            className="absolute inset-x-0 flex justify-center items-center z-40 pointer-events-none"
            style={{ bottom: 'max(8px, env(safe-area-inset-bottom, 8px))' }}
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/35 backdrop-blur-md border border-white/20 shadow-sm pointer-events-auto">
              {wardrobeSlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    idx === page
                      ? 'w-4 h-1.5 bg-[#c5a059]'
                      : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to wardrobe slide ${idx + 1}`}
                  title={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
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
