import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import familyBg from '../../assets/family details page.webp';
import deviderImg from '../../assets/devider.webp';
import logoImg from '../../assets/logo.webp';

// Orchestrated staggered animation variants for smooth appearance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.08,
    },
  },
};

const logoVariants = {
  hidden: { opacity: 0, scale: 0.85, y: -12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
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
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function FamilyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="family-details-full-page"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 w-full h-full bg-[#f4ece1] overflow-hidden select-none"
      >
        {/* Full-Page Event Backdrop Artwork */}
        <div className="relative w-full h-full aspect-[3000/5400] max-h-full mx-auto overflow-hidden">
          <motion.img
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            src={familyBg}
            alt="Family Details Celebration"
            className="w-full h-full object-cover pointer-events-none"
            loading="eager"
          />

          {/* Typography Layout matching the Reference Image */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="absolute top-[2.8%] inset-x-0 flex flex-col items-center text-center px-4 sm:px-6 pointer-events-none"
          >
            {/* Top Monogram Emblem Logo (Smriti & Floyd) */}
            <motion.div
              variants={logoVariants}
              className="w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] mb-1.5 flex items-center justify-center flex-shrink-0"
            >
              <img
                src={logoImg}
                alt="Smriti & Floyd Logo"
                className="w-full h-full object-contain pointer-events-none drop-shadow-sm"
              />
            </motion.div>

            {/* 1. Welcoming you with love */}
            <motion.div variants={sectionVariants} className="mb-2 sm:mb-2.5">
              <h3 className="font-serif text-[13.5px] sm:text-[15px] font-normal text-[#916a3c] tracking-[0.03em] mb-0.5 leading-snug">
                Welcoming you with love
              </h3>
              <div className="font-serif text-[11px] sm:text-[12.5px] font-normal text-[#143d6a] space-y-[1px] leading-tight">
                <p>Kishanlal</p>
                <p>Kamala & Suresh</p>
                <p>Kiran & Mahesh</p>
                <p>Neelam & Ganga Dhar</p>
                <p>Pinky & Bhawani Shankar</p>
              </div>
            </motion.div>

            {/* 2. Blessings & best wishes from */}
            <motion.div variants={sectionVariants} className="mb-2 sm:mb-2.5">
              <h3 className="font-serif text-[13.5px] sm:text-[15px] font-normal text-[#916a3c] tracking-[0.03em] mb-0.5 leading-snug">
                Blessings & best wishes from
              </h3>
              <div className="font-serif text-[11px] sm:text-[12.5px] font-normal text-[#143d6a] space-y-[1px] leading-tight">
                <p>Indra & Hari Pansari</p>
                <p>Kamlesh & Sanjeev Agarwal</p>
                <p>Asha & Sushil Mittal</p>
              </div>
            </motion.div>

            {/* 3. Requesting your gracious presence */}
            <motion.div variants={sectionVariants} className="mb-2 sm:mb-2.5">
              <h3 className="font-serif text-[13.5px] sm:text-[15px] font-normal text-[#916a3c] tracking-[0.03em] mb-0.5 leading-snug">
                Requesting your gracious presence
              </h3>
              <div className="font-serif text-[11px] sm:text-[12.5px] font-normal text-[#143d6a] space-y-[1px] leading-tight">
                <p>Surbhi & Kapil Parasrampuria</p>
                <p>Suchi & Anuj Bagla</p>
                <p>Shilpi & Ronak</p>
                <p>Navya</p>
                <p className="pt-0.5">& the entire Dewan family</p>
              </div>
            </motion.div>

            {/* 4. With love from nanihal */}
            <motion.div variants={sectionVariants} className="mb-2 sm:mb-2.5">
              <h3 className="font-serif text-[13.5px] sm:text-[15px] font-normal text-[#916a3c] tracking-[0.03em] mb-0.5 leading-snug">
                With love from nanihal
              </h3>
              <div className="font-serif text-[11px] sm:text-[12.5px] font-normal text-[#143d6a] leading-tight">
                <p>Usha & Rajesh Taluka</p>
              </div>
            </motion.div>

            {/* 5. Connect with family */}
            <motion.div variants={sectionVariants} className="mb-1.5 sm:mb-2">
              <h3 className="font-serif text-[13.5px] sm:text-[15px] font-normal text-[#916a3c] tracking-[0.03em] mb-0.5 leading-snug">
                Connect with family
              </h3>
              <div className="font-serif text-[11.5px] sm:text-[13px] font-normal text-[#143d6a] space-y-0.5 leading-tight pointer-events-auto">
                <p>
                  Sunil Dewan <span className="opacity-60 px-0.5">|</span>{' '}
                  <a
                    href="tel:+919828014221"
                    className="font-numbers tracking-wide hover:underline hover:text-[#916a3c] transition-colors"
                  >
                    +91 9828014221
                  </a>
                </p>
                <p>
                  Raghav Dewan <span className="opacity-60 px-0.5">|</span>{' '}
                  <a
                    href="tel:+917413044221"
                    className="font-numbers tracking-wide hover:underline hover:text-[#916a3c] transition-colors"
                  >
                    +91 7413044221
                  </a>
                </p>
              </div>
            </motion.div>

            {/* Ornamental Botanical Divider */}
            <motion.img
              variants={dividerVariants}
              src={deviderImg}
              alt="Divider"
              className="w-16 sm:w-20 object-contain my-1 sm:my-1.5 opacity-85 origin-center"
            />
          </motion.div>

          {/* Bottom Center Back Arrow Button */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.65, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-6 inset-x-0 flex items-center justify-center z-30 pointer-events-auto"
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-12 h-12 rounded-full bg-black/45 hover:bg-black/65 text-white backdrop-blur-md flex items-center justify-center shadow-2xl border border-white/25 transition-all cursor-pointer"
              aria-label="Back to RSVP"
              title="Back to RSVP"
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
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
