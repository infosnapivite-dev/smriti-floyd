import React, { useState } from 'react';
import { motion } from 'framer-motion';
import rsvpBg from '../../assets/7-rsvp page.webp';
import deviderImg from '../../assets/devider.webp';
import FamilyModal from '../Modals/FamilyModal';
import TravelModal from '../Modals/TravelModal';

export default function RsvpPage() {
  const [showFamilyModal, setShowFamilyModal] = useState(false);
  const [showTravelModal, setShowTravelModal] = useState(false);

  return (
    <section className="relative w-full aspect-[3000/5400] overflow-hidden select-none bg-[#f4ece1]">
      {/* Background artwork (signpost and vintage fiat car at bottom) */}
      <img
        src={rsvpBg}
        alt="RSVP and Journey Details"
        className="absolute inset-0 w-full h-full object-fill pointer-events-none gpu-accelerated"
        loading="eager"
      />

      {/* Top Content: RSVP & Plan Your Journey */}
      <div className="absolute top-[6.5%] inset-x-0 flex flex-col items-center text-center px-5">
        {/* RSVP Section */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-xl sm:text-2xl tracking-[0.2em] text-[#916a3c] font-semibold uppercase mb-2"
        >
          RSVP
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[11px] sm:text-xs text-[#183654] leading-relaxed max-w-[290px] mb-3"
        >
          We warmly invite you to be a part<br />
          of our wedding celebration<br />
          and make our special day even more memorable.<br />
          Your presence would mean so much to us,<br />
          and we look forward to creating beautiful<br />
          memories together.
        </motion.p>

        {/* View Family Details Button */}
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowFamilyModal(true)}
          className="px-6 py-2 sm:px-7 sm:py-2.5 rounded-full border border-[#916a3c]/80 bg-transparent hover:bg-[#916a3c]/10 transition-colors duration-200 cursor-pointer shadow-none mb-3.5"
        >
          <span className="font-serif text-[10.5px] sm:text-[11.5px] tracking-[0.2em] text-[#183654] font-medium uppercase select-none flex items-center gap-1.5">
            <span>✤</span> View Family Details <span>✤</span>
          </span>
        </motion.button>

        {/* Divider */}
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          src={deviderImg}
          alt="Divider"
          className="w-24 sm:w-28 object-contain mb-3.5 pointer-events-none"
        />

        {/* Plan Your Journey Section */}
        <motion.h3
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[17px] sm:text-xl tracking-[0.18em] text-[#916a3c] font-semibold uppercase mb-1.5"
        >
          Plan Your Journey
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif italic text-xs sm:text-[13px] text-[#183654] leading-snug max-w-[270px] mb-3"
        >
          Join us in Dehradun for the celebrations<br />
          of Smriti & Floyd
        </motion.p>

        {/* View Travel Details Button */}
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowTravelModal(true)}
          className="px-6 py-2 sm:px-7 sm:py-2.5 rounded-full border border-[#916a3c]/80 bg-transparent hover:bg-[#916a3c]/10 transition-colors duration-200 cursor-pointer shadow-none"
        >
          <span className="font-serif text-[10.5px] sm:text-[11.5px] tracking-[0.2em] text-[#183654] font-medium uppercase select-none flex items-center gap-1.5">
            <span>✤</span> View Travel Details <span>✤</span>
          </span>
        </motion.button>
      </div>

      {/* Signpost Clickable Overlays (Connecting directly to travel info) */}
      <div 
        className="absolute left-[8%] bottom-[23%] w-[35%] h-[18%] cursor-pointer z-10"
        title="Click to view travel guide"
        onClick={() => setShowTravelModal(true)}
      />

      {/* Modals */}
      <FamilyModal
        isOpen={showFamilyModal}
        onClose={() => setShowFamilyModal(false)}
      />
      <TravelModal
        isOpen={showTravelModal}
        onClose={() => setShowTravelModal(false)}
      />
    </section>
  );
}
