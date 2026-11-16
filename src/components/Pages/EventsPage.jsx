import React, { useState } from 'react';
import { motion } from 'framer-motion';
import eventsBg from '../../assets/5-events page.webp';
import haldiIcon from '../../assets/event-haldi-transparent.webp';
import sangeetIcon from '../../assets/event-sangeet-transparent.webp';
import weddingIcon from '../../assets/event-wedding-transparent.webp';
import receptionIcon from '../../assets/event-reception-transparent.webp';
import EventDetailModal from '../Modals/EventDetailModal';

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 'haldi',
      title: 'HALDI',
      dayNum: '18',
      date: '18th January',
      time: '1:30 PM Onwards',
      venue: 'THE DECK',
      iconImg: haldiIcon,
      bgColor: 'bg-[#eee7d7]',
      bgColorHex: '#faf5e4',
      borderTone: 'border-[#d8cca8]/70',
      dressCode: 'Sunshine Yellows, Mustard, Warm Ochre & Traditional Florals',
      description: 'An afternoon of laughter, marigolds, turmeric blessings, and refreshing mountain beverages under the Dehradun sun.'
    },
    {
      id: 'sangeet',
      title: 'SANGEET',
      dayNum: '18',
      date: '18th January',
      time: '7:30 PM Onwards',
      venue: 'MONAL',
      iconImg: sangeetIcon,
      bgColor: 'bg-[#fbdad0]',
      bgColorHex: '#fdf0ea',
      borderTone: 'border-[#e8baa9]/70',
      dressCode: 'Evening Sparkle, Indo-Western Tuxedos, Glam Lehengas & Cocktail Chic',
      description: 'Dance performances, music, celebratory toasts, and high-energy live beats that carry well into the starry Himalayan night.'
    },
    {
      id: 'pheras',
      title: 'PHERAS',
      dayNum: '19',
      date: '19th January',
      time: '11:30 AM Onwards',
      venue: 'THE WOODS',
      iconImg: weddingIcon,
      bgColor: 'bg-[#fae0c5]',
      bgColorHex: '#fcf1e5',
      borderTone: 'border-[#e4bfa0]/70',
      dressCode: 'Royal Pastel Indian Silks, Embroidered Sherwanis & Regal Tradition',
      description: 'The sacred wedding ceremony and seven vows taken around the holy fire amidst pine woods with panoramic valley views.'
    },
    {
      id: 'reception',
      title: 'RECEPTION',
      dayNum: '19',
      date: '19th January',
      time: '7:30 PM Onwards',
      venue: 'MONAL',
      iconImg: receptionIcon,
      bgColor: 'bg-[#d2e5f8]',
      bgColorHex: '#eaf2fa',
      borderTone: 'border-[#a5c4e4]/70',
      dressCode: 'Black Tie, Formal Evening Gowns & Elegant Indian Formals',
      description: 'A grand dinner banquet, cake cutting, heartfelt speeches, and unforgettable memories honoring the newlyweds.'
    }
  ];

  return (
    <section className="relative w-full aspect-[3000/5400] overflow-hidden select-none bg-[#f4ece1]">
      {/* Background artwork */}
      <img
        src={eventsBg}
        alt="Wedding Celebrations Itinerary"
        className="absolute inset-0 w-full h-full object-fill pointer-events-none gpu-accelerated"
        loading="eager"
      />

      {/* Content Container */}
      <div className="absolute top-[13.5%] inset-x-0 flex flex-col items-center px-4 sm:px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-lg sm:text-xl md:text-2xl tracking-[0.2em] text-[#916a3c] font-semibold uppercase mb-1"
        >
          The Celebrations
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif italic text-xs sm:text-sm text-[#183654] mb-5 sm:mb-6"
        >
          Click each event to explore
        </motion.p>

        {/* 4 Cards Stack */}
        <div className="w-full max-w-[340px] space-y-3 sm:space-y-3.5">
          {events.map((ev, index) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.25 + index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedEvent(ev)}
              className={`relative flex items-center justify-between py-2.5 px-3.5 sm:py-3 sm:px-4 rounded-2xl ${ev.bgColor} border ${ev.borderTone} shadow-sm backdrop-blur-sm cursor-pointer transition-shadow hover:shadow-md`}
            >
              {/* Left: Authentic PNG Illustration */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 flex items-center justify-center">
                <img
                  src={ev.iconImg}
                  alt={ev.title}
                  className="w-full h-full object-contain pointer-events-none"
                  loading="eager"
                />
              </div>

              {/* Center: Details */}
              <div className="flex-1 text-center px-2">
                <h3 className="font-serif text-[14px] sm:text-base font-bold tracking-[0.16em] text-[#916a3c] uppercase">
                  {ev.title}
                </h3>
                <p className="font-serif text-[11px] sm:text-[12px] text-[#183654] font-semibold leading-tight mt-0.5 tracking-[0.04em]">
                  <span className="font-numbers">{ev.dayNum}</span><sup className="text-[0.62em] lowercase font-normal align-super ml-0.5 mr-0.5">th</sup> January · <span className="font-numbers">{ev.time}</span>
                </p>
                <p className="font-serif text-[10px] sm:text-[10.5px] text-[#183654] tracking-[0.2em] uppercase font-bold mt-0.5">
                  {ev.venue}
                </p>
              </div>

              {/* Right: Chevron */}
              <div className="w-5 flex items-center justify-center text-[#916a3c]/80 flex-shrink-0">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Modal when event is clicked */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </section>
  );
}
