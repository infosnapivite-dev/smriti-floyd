import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import IPhoneFrame from './components/Chassis/IPhoneFrame';
import EnvelopeOpening from './components/Envelope/EnvelopeOpening';
import HomePage from './components/Pages/HomePage';
import CouplePage from './components/Pages/CouplePage';
import CountdownPage from './components/Pages/CountdownPage';
import EventsPage from './components/Pages/EventsPage';
import WardrobePage from './components/Pages/WardrobePage';
import RsvpPage from './components/Pages/RsvpPage';
import LastPage from './components/Pages/LastPage';
import './styles/iphone-mockup.css';

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isOpeningStarted, setIsOpeningStarted] = useState(false);
  const scrollContainerRef = useRef(null);
  const lenisRef = useRef(null);

  // Initialize Lenis smooth scroll on the mobile scroll container once envelope is opened
  useEffect(() => {
    if (!isEnvelopeOpen || !scrollContainerRef.current) return;

    const lenis = new Lenis({
      wrapper: scrollContainerRef.current,
      content: scrollContainerRef.current.firstElementChild,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const reqId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(reqId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isEnvelopeOpen]);

  const handleScrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.5 });
    } else if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReplayEnvelope = () => {
    setIsOpeningStarted(false);
    setIsEnvelopeOpen(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="desktop-viewport-container">
      <IPhoneFrame>
        <div id="phone-screen-viewport" className="relative w-full h-full bg-[#f4ece1] overflow-hidden">
          {/* Continuous Scrolling Wedding Website (Pages 2 through 8) */}
          <main
            id="mockup-scroll-container"
            ref={scrollContainerRef}
            className={`w-full h-full bg-[#f4ece1] ${
              isEnvelopeOpen ? 'inner-app-scroll' : 'overflow-hidden pointer-events-none'
            }`}
          >
            {/* Continuous Page Sections Stack (Zero crop, exact aspect ratio matching mobile screens) */}
            <div className="w-full flex flex-col bg-[#f4ece1]">
              {/* Page 2: Home Page (Taj Mussoorie Video & Couple) */}
              <HomePage isEnvelopeOpen={isEnvelopeOpen} isOpeningStarted={isOpeningStarted} />

              {/* Page 3: Couple & Family Details */}
              <CouplePage />

              {/* Page 4: Countdown to January 18, 2027 */}
              <CountdownPage />

              {/* Page 5: The Celebrations (Haldi, Sangeet, Pheras, Reception) */}
              <EventsPage />

              {/* Page 6: Wardrobe Planner Lookbook */}
              <WardrobePage />

              {/* Page 7: RSVP & Plan Your Journey */}
              <RsvpPage />

              {/* Page 8: Last Page / Closing Sunset Terrace */}
              <LastPage 
                onScrollToTop={handleScrollToTop} 
                onReplayEnvelope={handleReplayEnvelope}
              />
            </div>
          </main>

          {/* Modal Portal Root (Mounted at Phone Viewport level to avoid scroll scaling distortion) */}
          <div id="modal-root" className="absolute inset-0 z-50 pointer-events-none overflow-hidden" />

          {/* Interactive Opening Envelope Overlay */}
          <AnimatePresence>
            {!isEnvelopeOpen && (
              <motion.div
                key="opening-envelope-overlay"
                className="absolute inset-0 z-40 w-full h-full"
                initial={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.35, ease: 'easeOut' }
                }}
              >
                <EnvelopeOpening 
                  onOpenStart={() => setIsOpeningStarted(true)}
                  onOpenComplete={() => setIsEnvelopeOpen(true)} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </IPhoneFrame>
    </div>
  );
}
