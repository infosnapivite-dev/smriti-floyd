import React from 'react';
import { motion } from 'framer-motion';
import coupleBg from '../../assets/3-couple detail page.webp';
import deviderImg from '../../assets/devider.webp';
import ganeshImg from '../../assets/3-couple detail page - ganesh ji.webp';

export default function CouplePage() {
  return (
    <section className="relative w-full aspect-[3000/5400] overflow-hidden select-none bg-[#f4ece1]">
      {/* Background artwork (mountains and floral border at bottom) */}
      <img
        src={coupleBg}
        alt="Wedding Blessings & Family Details"
        className="absolute inset-0 w-full h-full object-fill pointer-events-none gpu-accelerated"
        loading="eager"
      />

      {/* Content Container */}
      <div className="absolute top-[2.5%] inset-x-0 flex flex-col items-center text-center px-6 desktop-page-overlay">
        {/* Lord Ganesha Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 12 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-14 h-16 sm:w-16 sm:h-20 mb-2 flex items-center justify-center"
        >
          <img
            src={ganeshImg}
            alt="Lord Ganesha"
            className="w-full h-full object-contain pointer-events-none drop-shadow-sm"
          />
        </motion.div>

        {/* Mantras */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-serif text-xs sm:text-sm tracking-wider text-[#916a3c] font-medium leading-relaxed">
            || Shri Ganeshaya Namah ||
          </p>
          <p className="font-serif text-xs sm:text-sm tracking-wider text-[#916a3c] font-medium mb-3">
            || Jeen Mataye Namah ||
          </p>
        </motion.div>

        {/* Memory Of */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-serif italic text-sm sm:text-base text-[#2c3e50] mb-2 tracking-wide">
            With love and gratitude, we cherish the memory of
          </p>
          <p className="font-serif text-sm sm:text-[15px] md:text-base font-semibold text-[#8b5a2b] tracking-wide leading-snug">
            Late Smt. Santra Devi Dewan
          </p>
          <p className="font-serif text-sm sm:text-[15px] md:text-base font-semibold text-[#8b5a2b] tracking-wide mb-4 leading-snug">
            Late Shree Madan Lal Dewan
          </p>
        </motion.div>

        {/* Joyfully Invite */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-sm sm:text-[15px] text-[#2c3e50] max-w-[310px] leading-relaxed mb-3"
        >
          Our families joyfully invite you to celebrate the wedding of
        </motion.p>

        {/* Bride in Great Vibes */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="font-script text-5xl sm:text-6xl md:text-7xl text-[#9b6a38] leading-tight"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Smriti
          </h2>
          <p className="font-serif text-xs sm:text-sm text-[#2c3e50] tracking-wide mb-3">
            (D/o Mrs. Reema Dewan & Mr. Sunil Dewan)
          </p>
        </motion.div>

        {/* With */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="font-serif italic text-sm sm:text-base text-[#8b5a2b] my-0.5"
        >
          with
        </motion.p>

        {/* Groom in Great Vibes */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="font-script text-5xl sm:text-6xl md:text-7xl text-[#9b6a38] leading-tight"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Floyd
          </h2>
          <p className="font-serif text-xs sm:text-sm text-[#2c3e50] tracking-wide mb-3">
            (S/o Mrs. Anitha D’Costa & Mr. Paul D’Costa)
          </p>
        </motion.div>

        {/* Divider */}
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          src={deviderImg}
          alt="Floral Divider"
          className="w-28 sm:w-32 object-contain my-2 pointer-events-none"
        />

        {/* With Love */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-serif italic text-sm sm:text-base text-[#8b5a2b] mb-1">With Love</p>
          <p className="font-serif text-sm sm:text-base font-medium text-[#2c3e50] tracking-wider">
            Sneha Dewan & Raghav Dewan
          </p>
        </motion.div>
      </div>
    </section>
  );
}
