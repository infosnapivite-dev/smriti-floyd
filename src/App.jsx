import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import IPhoneFrame from './components/Chassis/IPhoneFrame';
import EnvelopeOpening from './components/Envelope/EnvelopeOpening';
import HomePage from './components/Pages/HomePage';
import CouplePage from './components/Pages/CouplePage';
import CountdownPage from './components/Pages/CountdownPage';
import EventsPage from './components/Pages/EventsPage';
import WardrobePage from './components/Pages/WardrobePage';
import RsvpPage from './components/Pages/RsvpPage';
import LastPage from './components/Pages/LastPage';
import haldiFullBg from './assets/haldi page.webp';
import sangeetFullBg from './assets/sangeet page.webp';
import pherasFullBg from './assets/pheras.webp';
import receptionFullBg from './assets/reception.webp';
import familyBg from './assets/family details page.webp';
import eventsBg from './assets/5-events page.webp';
import qaafiranaSong from './assets/Qaafirana.m4a';
import { preloadImages } from './utils/imagePreloader';
import './styles/iphone-mockup.css';

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isOpeningStarted, setIsOpeningStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const scrollContainerRef = useRef(null);
  const lenisRef = useRef(null);
  const audioRef = useRef(null);

  // Silently preload event modal and detail backgrounds in the background on initial load
  useEffect(() => {
    preloadImages([
      eventsBg,
      haldiFullBg,
      sangeetFullBg,
      pherasFullBg,
      receptionFullBg,
      familyBg,
    ]);
  }, []);

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

  const startAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Audio playback waiting for interaction:", err);
      });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (!isPlaying) {
      audioRef.current.muted = false;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setIsMuted(false);
      }).catch(() => { });
      return;
    }
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <div className="desktop-viewport-container">
      {/* Background Wedding Music Player (Looping until website/browser closed) */}
      <audio
        ref={audioRef}
        src={qaafiranaSong}
        loop
        preload="auto"
      />

      <IPhoneFrame>
        <div id="phone-screen-viewport" className="relative w-full h-full bg-[#f4ece1] overflow-hidden">
          {/* Top Left Floating Music Mute/Unmute Toggle Button */}
          <AnimatePresence>
            {isOpeningStarted && (
              <motion.button
                key="music-toggle-btn"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute background music" : "Mute background music"}
                title={isMuted ? "Unmute Music (Qaafirana)" : "Mute Music"}
                style={{
                  top: 'max(14px, env(safe-area-inset-top, 14px))',
                  left: 'max(14px, env(safe-area-inset-left, 14px))',
                }}
                className="absolute z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#fbf8f2]/85 backdrop-blur-md border border-[#c5a059]/60 shadow-lg text-[#183654] hover:bg-[#fbf8f2] hover:border-[#916a3c] hover:text-[#916a3c] transition-all duration-200 cursor-pointer pointer-events-auto"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#786f77]" strokeWidth={2.2} />
                ) : (
                  <Volume2 className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#183654]" strokeWidth={2.2} />
                )}
              </motion.button>
            )}
          </AnimatePresence>

          {/* Continuous Scrolling Wedding Website (Pages 2 through 8) */}
          <main
            id="mockup-scroll-container"
            ref={scrollContainerRef}
            className={`w-full h-full bg-[#f4ece1] ${isEnvelopeOpen ? 'inner-app-scroll' : 'overflow-hidden pointer-events-none'
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
                  onOpenStart={() => {
                    setIsOpeningStarted(true);
                    startAudio();
                  }}
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
