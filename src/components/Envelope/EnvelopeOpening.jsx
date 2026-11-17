import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Pointer } from 'lucide-react';
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
export default function EnvelopeOpening({ onOpenStart, onOpenComplete }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    if (onOpenStart) {
      onOpenStart();
    }

    // Slide down time for bottom envelope to smoothly slide off-screen (slowed down for tactile grace)
    setTimeout(() => {
      if (onOpenComplete) {
        onOpenComplete();
      }
    }, 4600);
  };

  return (
    <div 
      className="relative w-full h-full min-h-full flex items-center justify-center bg-transparent overflow-hidden select-none cursor-pointer"
      onClick={handleOpen}
      title="Tap anywhere to open envelope"
    >
      {/* Cream background that covers the screen when closed, and fades out immediately when envelope opens */}
      <motion.div
        className="absolute inset-0 bg-[#f4ece1] z-0 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: isOpening ? 0 : 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
      {/* 3D Perspective Stage for Envelope Flap - slight zoom (scale-[1.05]) to eliminate left/right edge gap */}
      <div 
        className="relative w-full aspect-[888/1600] flex items-center justify-center scale-[1.05]"
        style={{ perspective: 1800 }}
      >
        {/* Layer 1: Bottom Remaining Envelope Card (Slides down slowly to reveal HomePage without blending/blur) */}
        <motion.div
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
          initial={{ y: '0%', opacity: 1, scale: 1.045 }}
          animate={
            isOpening
              ? {
                  y: ['0%', '0%', '115%'],
                  opacity: [1, 1, 1, 0],
                  scale: 1.045,
                }
              : { y: '0%', opacity: 1, scale: 1.045 }
          }
          transition={{
            duration: 4.6,
            times: [0, 0.15, 0.96, 1],
            ease: [0.25, 0.1, 0.25, 1],
          }}
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
                  rotateX: [0, 50, 110, 180],
                  opacity: [1, 1, 0.8, 0],
                  scale: 1.045,
                }
              : { rotateX: 0, opacity: 1, scale: 1.045 }
          }
          transition={{
            duration: 1.6,
            times: [0, 0.35, 0.7, 1],
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
            className="envelope-wax-seal rounded-full cursor-pointer drop-shadow-xl"
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

        {/* Layer 4: Compact Elegant Pill "CLICK TO OPEN" Button with Hand Icon */}
        <div
          className="absolute inset-x-0 z-30 pointer-events-auto flex flex-col items-center justify-center cursor-pointer select-none"
          style={{ bottom: 'calc(5.5% + 50px)' }}
        >
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={
              isOpening
                ? { opacity: 0, y: 10, pointerEvents: 'none' }
                : { opacity: 1, y: 0 }
            }
            transition={{ duration: 0.45, ease: 'easeOut' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex flex-col items-center justify-center gap-2 cursor-pointer"
          >
            {/* Pill Button */}
            <div className="px-5 py-1.5 sm:px-6 sm:py-2 rounded-full border border-[#9b6a38]/85 bg-[#f4ece1]/85 backdrop-blur-[2px] shadow-sm hover:bg-[#9b6a38]/10 transition-colors duration-200 whitespace-nowrap flex items-center justify-center text-center">
              <span className="font-['Cinzel',serif] text-[10.5px] sm:text-[11.5px] font-medium tracking-[0.2em] text-[#1e3a58] uppercase select-none whitespace-nowrap block leading-none text-center pl-[0.2em]">
                CLICK TO OPEN
              </span>
            </div>

            {/* Hand Pointer Icon matching reference */}
            <motion.div
              animate={{ y: [0, -3.5, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="flex items-center justify-center text-[#4b5563]"
            >
              <Pointer className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-sm" strokeWidth={1.8} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
