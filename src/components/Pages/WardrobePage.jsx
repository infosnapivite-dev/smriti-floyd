import React, { useState } from 'react';
import { motion } from 'framer-motion';
import wardrobeBg from '../../assets/6-wardrobe page.webp';
import deviderImg from '../../assets/devider.webp';
import WardrobeModal from '../Modals/WardrobeModal';

export default function WardrobePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative w-full aspect-[3000/5400] overflow-hidden select-none bg-[#f4ece1]">
      {/* Background artwork (painted wardrobe cabinet in sky, terrace and mountains below) */}
      <img
        src={wardrobeBg}
        alt="Wardrobe Planner"
        className="absolute inset-0 w-full h-full object-fill pointer-events-none gpu-accelerated"
        loading="eager"
      />

      {/* Top Header Text (Positioned above the illustrated wardrobe cabinet) */}
      <div className="absolute top-[12.5%] inset-x-0 flex flex-col items-center text-center px-4 desktop-page-overlay">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[21px] sm:text-2xl tracking-[0.18em] text-[#916a3c] font-semibold uppercase mb-1.5"
        >
          Wardrobe Planner
        </motion.h2>
      </div>

      {/* "OPEN" Button & Divider (Positioned below the wardrobe cabinet at ~47%) */}
      <div className="absolute top-[47%] inset-x-0 flex flex-col items-center text-center px-4 desktop-page-overlay">
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-2 rounded-full border border-[#916a3c]/80 bg-transparent hover:bg-[#916a3c]/10 transition-colors duration-200 cursor-pointer shadow-none"
        >
          <span className="font-serif text-xs sm:text-[13px] tracking-[0.25em] text-[#183654] font-semibold uppercase block select-none">
            Open
          </span>
        </motion.button>

        {/* Small Floral Divider */}
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          src={deviderImg}
          alt="Divider"
          className="w-24 sm:w-28 object-contain mt-4 pointer-events-none"
        />
      </div>

      {/* Wardrobe Modal */}
      <WardrobeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
