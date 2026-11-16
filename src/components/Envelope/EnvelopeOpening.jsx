import React, { useState } from 'react';
import { motion } from 'framer-motion';
import upperFlapImg from '../../assets/1-envelope-upper-flap.webp';
import remainingImg from '../../assets/1-envelope-remaining.webp';
import envelopeSealImg from '../../assets/first page - envelope seal.webp';

/**
 * EnvelopeOpening Component
 * 1. 1-envelope-remaining.webp placed at background
 * 2. 1-envelope-upper-flap.webp animated opening SLOWLY from FRONT side (positive 3D rotateX coming towards camera)
 * 3. first page - envelope seal.webp placed in center of envelope
 * 4. Click to open button removed
 * 5. Smooth blend effect dissolving both PNGs when envelope opens
 */
export default function EnvelopeOpening({ onOpenComplete }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Decreased blend time for a smoother, quicker transition
    setTimeout(() => {
      if (onOpenComplete) {
        onOpenComplete();
      }
    }, 1800);
  };

  return (
    <div 
      className="relative w-full h-full min-h-full flex items-center justify-center bg-[#f4ece1] overflow-hidden select-none cursor-pointer"
      onClick={handleOpen}
      title="Tap anywhere to open envelope"
    >
      {/* 3D Perspective Stage for Envelope Flap - slight zoom (scale-[1.05]) to eliminate left/right edge gap */}
      <div 
        className="relative w-full aspect-[888/1600] flex items-center justify-center scale-[1.05]"
        style={{ perspective: 1800 }}
      >
        {/* Layer 1: Bottom Remaining Envelope Card (Placed at Background) */}
        <motion.div
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
          initial={{ opacity: 1, scale: 1.045, filter: 'blur(0px)' }}
          animate={
            isOpening
              ? {
                  opacity: [1, 0.8, 0.3, 0],
                  scale: [1.045, 1.055, 1.07, 1.09],
                  filter: ['blur(0px)', 'blur(0px)', 'blur(2px)', 'blur(8px)'],
                }
              : { opacity: 1, scale: 1.045, filter: 'blur(0px)' }
          }
          transition={{ duration: 1.7, delay: 0.15, ease: [0.35, 0, 0.25, 1] }}
        >
          <img
            src={remainingImg}
            alt="Envelope Background Body"
            className="w-full h-full object-cover pointer-events-none"
          />
        </motion.div>

        {/* Layer 2: Upper Flap (Opens from FRONT SIDE lifting forward towards the viewer) */}
        <motion.div
          className="absolute inset-0 w-full h-full z-20 pointer-events-none"
          style={{
            transformOrigin: '50% 0%',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
          initial={{ rotateX: 0, opacity: 1, scale: 1.045 }}
          animate={
            isOpening
              ? {
                  // Positive rotateX brings the flap tip forward towards the viewer (front side opening)
                  rotateX: [0, 55, 115, 180],
                  opacity: [1, 1, 0.7, 0],
                  scale: [1.045, 1.06, 1.08, 1.1],
                  filter: ['blur(0px)', 'blur(0px)', 'blur(2px)', 'blur(6px)'],
                }
              : { rotateX: 0, opacity: 1, scale: 1.045 }
          }
          transition={{
            duration: 1.6,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <img
            src={upperFlapImg}
            alt="Envelope Opening Upper Flap"
            className="w-full h-full object-cover pointer-events-none drop-shadow-2xl"
          />
        </motion.div>

        {/* Layer 3: Golden Wax Seal Centered on Envelope */}
        <div 
          className="absolute z-30 pointer-events-auto flex items-center justify-center"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <motion.div
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full cursor-pointer drop-shadow-xl"
            initial={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            animate={
              isOpening
                ? {
                    opacity: 0,
                    scale: 0.94,
                    filter: 'blur(4px)',
                  }
                : { opacity: 1, scale: 1, filter: 'blur(0px)' }
            }
            transition={{
              duration: 0.55,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <img
              src={envelopeSealImg}
              alt="SF Wax Seal"
              className="w-full h-full object-contain pointer-events-none"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
