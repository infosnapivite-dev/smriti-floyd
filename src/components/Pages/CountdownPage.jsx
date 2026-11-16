import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import countdownBg from '../../assets/4-countdown page.webp';
import numberCoverImg from '../../assets/countdown number cover.webp';
import deviderImg from '../../assets/devider.webp';

export default function CountdownPage() {
  const [daysRemaining, setDaysRemaining] = useState('000');

  useEffect(() => {
    const calculateDays = () => {
      // Wedding date: January 18, 2027
      const weddingDate = new Date('2027-01-18T00:00:00');
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();
      
      if (difference > 0) {
        const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
        // Format to 3 digits like "058" or "342"
        setDaysRemaining(String(days).padStart(3, '0'));
      } else {
        setDaysRemaining('000');
      }
    };

    calculateDays();
    const interval = setInterval(calculateDays, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCalendar = () => {
    // Generate Google Calendar Link
    const title = encodeURIComponent("Smriti & Floyd Wedding Celebration");
    const details = encodeURIComponent("Join us in celebrating the wedding of Smriti & Floyd at Taj Mussoorie Foothills, Dehradun.");
    const location = encodeURIComponent("Taj Mussoorie Foothills, Dehradun, Uttarakhand, India");
    const dates = "20270118T080000Z/20270120T183000Z";
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(googleCalendarUrl, '_blank');
  };

  const digits = daysRemaining.split('');

  return (
    <section className="relative w-full aspect-[3000/5400] overflow-hidden select-none bg-[#f4ece1]">
      {/* Background artwork (flowers at top corners, villa & mountains at bottom) */}
      <img
        src={countdownBg}
        alt="Countdown to the Celebration"
        className="absolute inset-0 w-full h-full object-fill pointer-events-none gpu-accelerated"
        loading="eager"
      />

      {/* Countdown Content Overlay */}
      <div className="absolute top-[18%] inset-x-0 flex flex-col items-center text-center px-4">
        {/* Title in one row with slightly smaller text */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[10.5px] sm:text-xs md:text-[13px] tracking-[0.18em] text-[#916a3c] font-medium uppercase mb-3 whitespace-nowrap"
        >
          The Best Chapter is About to Begin
        </motion.h2>

        {/* Small Floral Divider */}
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          src={deviderImg}
          alt="Divider"
          className="w-24 sm:w-28 object-contain mb-5 pointer-events-none"
        />

        {/* 3 Number Cards with 2 vertical dividing lines matching reference image */}
        <div className="flex items-center justify-center my-3 w-full">
          {digits.map((digit, idx) => (
            <React.Fragment key={idx}>
              <motion.div
                initial={{ scale: 0.82, opacity: 0, y: 15 }}
                whileInView={{ scale: 1, opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.25 + idx * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[1024/1536] flex items-center justify-center drop-shadow-sm flex-shrink-0"
                style={{ width: '96px', maxWidth: '28%' }}
              >
                {/* Ornate Gold Border Frame Asset */}
                <img
                  src={numberCoverImg}
                  alt="Ornate Frame"
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                />
                {/* Number Digit (Vertically & horizontally centered inside frame) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span 
                    className="font-numbers font-medium text-[#0f2d59] tracking-tight select-none leading-none inline-block text-center"
                    style={{ fontSize: 'clamp(48px, 15vw, 68px)', transform: 'translateY(-1px)' }}
                  >
                    {digit}
                  </span>
                </div>
              </motion.div>

              {/* Slender golden vertical dividing line between frames */}
              {idx < digits.length - 1 && (
                <motion.div 
                  initial={{ opacity: 0, scaleY: 0.4 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: 0.35 + idx * 0.15, duration: 0.6 }}
                  className="w-[1px] bg-[#916a3c]/80 flex-shrink-0 mx-1.5 sm:mx-2.5"
                  style={{ height: '72px' }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* DAYS Label (Slightly Decreased Text Size) */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[10px] sm:text-[11px] tracking-[0.25em] text-[#916a3c] font-semibold uppercase mt-5 mb-3"
        >
          Days
        </motion.p>

        {/* Divider */}
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          src={deviderImg}
          alt="Divider"
          className="w-24 sm:w-28 object-contain mb-5 pointer-events-none"
        />

        {/* Add Events to Calendar Button (Matching Reference Image) */}
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleAddToCalendar}
          className="px-5 py-1.5 sm:px-6 sm:py-2 rounded-full border border-[#a87f48]/80 bg-transparent hover:bg-[#a87f48]/10 transition-colors duration-200 cursor-pointer shadow-none"
        >
          <span className="font-serif text-[9.5px] sm:text-[10.5px] tracking-[0.2em] text-[#916a3c] font-medium uppercase select-none block">
            Add Events to Calendar
          </span>
        </motion.button>
      </div>
    </section>
  );
}
