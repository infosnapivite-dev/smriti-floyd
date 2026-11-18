import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import homeVideo from '../../assets/2-home page.mp4';
import deviderImg from '../../assets/devider.webp';

export default function HomePage({ isEnvelopeOpen = true, isOpeningStarted = false }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isEnvelopeOpen || isOpeningStarted) {
      const playVideo = () => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setHasPlayed(true);
            })
            .catch((err) => {
              console.log("Autoplay unmuted blocked, falling back to muted:", err);
              video.muted = true;
              video.play().then(() => setHasPlayed(true)).catch((e) => console.log(e));
            });
        }
      };

      // Play the video immediately so that on iOS/iPhone,
      // the video paints live frames instantly as the upper flap opens without any blank delay.
      playVideo();

      let contentTimer;
      // If already open (e.g. replay or loaded opened), show immediately
      if (isEnvelopeOpen) {
        setShowContent(true);
      } else {
        // Reveal text gracefully as the bottom envelope slides down (1s delay + 1.4s slide = 2.4s)
        contentTimer = setTimeout(() => {
          setShowContent(true);
        }, 2400);
      }

      return () => {
        if (contentTimer) clearTimeout(contentTimer);
      };
    } else {
      // When envelope is closed / replayed, pause and rewind
      video.pause();
      try {
        video.currentTime = 0;
      } catch (e) {}
      setHasPlayed(false);
      setShowContent(false);
    }
  }, [isEnvelopeOpen, isOpeningStarted]);

  // Monitor video frame by frame:
  // 1. Draw frames onto canvasRef as an indestructible fallback.
  // 2. Pause exactly right before video ends (~4.92s) so iOS WebKit NEVER fires the 'ended'
  //    event which causes mobile Safari to wipe the video frame buffer to solid black.
  useEffect(() => {
    let animId;
    const syncFrame = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video) {
        // Continuously paint current video frame onto canvas
        if (canvas && video.videoWidth > 0 && !video.paused) {
          if (canvas.width !== video.videoWidth) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
          }
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          }
        }

        // Freeze gracefully on the last frame before 'ended' triggers (5s video, freeze at ~4.92s)
        if (video.duration > 0 && video.currentTime >= video.duration - 0.08) {
          video.pause();
          try {
            video.currentTime = video.duration - 0.08;
          } catch (e) {}

          // Ensure canvas definitely has this final frame
          if (canvas && video.videoWidth > 0) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            }
          }
          return; // Stop animation loop once frozen on last frame
        }
      }

      animId = requestAnimationFrame(syncFrame);
    };

    if (isOpeningStarted || isEnvelopeOpen) {
      animId = requestAnimationFrame(syncFrame);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isOpeningStarted, isEnvelopeOpen]);

  const handleVideoEnded = () => {
    // Failsafe: if video reaches ended, immediately seek to final frame and freeze
    const video = videoRef.current;
    if (video && video.duration > 0) {
      try {
        video.currentTime = Math.max(0, video.duration - 0.08);
      } catch (e) {}
      video.pause();
    }
  };

  return (
    <section className="relative w-full aspect-[3000/5400] overflow-hidden select-none bg-[#f4ece1]">
      {/* Indestructible Fallback Canvas: Holds the video frame persistently so it NEVER turns black on iOS */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Auto-playing Background Video (Plays exactly 1 time, frozen on last frame) */}
      <video
        ref={videoRef}
        src={homeVideo}
        autoPlay
        playsInline
        muted
        loop={false}
        preload="auto"
        onEnded={handleVideoEnded}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none gpu-accelerated"
      />

      {/* Typography Overlay that appears on top of the video */}
      <div className="absolute top-[23.5%] inset-x-0 flex flex-col items-center text-center px-4 z-10 desktop-page-overlay">
        {/* Couple Names in Great Vibes */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-script text-4xl sm:text-5xl md:text-6xl text-[#9b6a38] leading-none mb-1.5"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          Smriti <span className="font-serif text-2xl sm:text-3xl font-light text-[#203a43] italic px-1">and</span> Floyd
        </motion.h1>

        {/* Invitation Text */}
        <motion.p 
          initial={{ opacity: 0, y: 14 }}
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.85, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-xs sm:text-[13px] text-[#183654] tracking-wide mb-1.5 leading-snug"
        >
          invite you to celebrate their beautiful beginning
        </motion.p>

        {/* Botanical Divider */}
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={showContent ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
          src={deviderImg}
          alt="Divider"
          className="w-24 sm:w-28 object-contain my-1 pointer-events-none"
        />

        {/* Dates */}
        <motion.p 
          initial={{ opacity: 0, y: 12 }}
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.85, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-sm sm:text-base md:text-lg font-medium text-[#183654] tracking-[0.1em] mt-1 mb-0.5 leading-tight"
        >
          <span className="font-numbers">18</span><sup className="text-[10px] lowercase font-normal align-super ml-0.5 mr-1">th</sup>– <span className="font-numbers">20</span><sup className="text-[10px] lowercase font-normal align-super ml-0.5 mr-1">th</sup> January, <span className="font-numbers">2027</span>
        </motion.p>

        {/* Venue Info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.85, delay: 0.92, ease: [0.22, 1, 0.36, 1] }}
          className="leading-tight"
        >
          <p className="font-serif italic text-xs text-[#183654] my-0.5">at</p>
          <p className="font-serif text-xs sm:text-sm md:text-base font-semibold text-[#183654] tracking-wide leading-tight">
            Taj Mussoorie Foothills,
          </p>
          <p className="font-serif text-xs sm:text-sm text-[#183654] tracking-wider leading-tight">
            Dehradun
          </p>
        </motion.div>
      </div>

      {/* Bottom Center Scroll Indication (No pill layout, animated downward arrow + scroll text) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={
          showContent
            ? {
                opacity: 1,
                transition: { duration: 0.8, delay: 1.15, ease: 'easeOut' },
              }
            : { opacity: 0 }
        }
        onClick={() => {
          const scrollContainer = document.getElementById('mockup-scroll-container');
          if (scrollContainer) {
            scrollContainer.scrollBy({ top: scrollContainer.clientHeight * 0.95, behavior: 'smooth' });
          } else {
            window.scrollBy({ top: window.innerHeight * 0.95, behavior: 'smooth' });
          }
        }}
        className="absolute inset-x-0 bottom-[2.5%] z-20 flex flex-col items-center justify-center cursor-pointer select-none pointer-events-auto"
        title="Scroll to explore"
      >
        <motion.div
          animate={{
            y: [0, 5, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="flex flex-col items-center justify-center gap-1 text-[#183654]"
        >
          <span className="font-['Cinzel',serif] text-[11.5px] sm:text-[13px] font-semibold tracking-[0.28em] pl-[0.28em] uppercase leading-none drop-shadow-sm opacity-95">
            Scroll
          </span>
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-sm opacity-95"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
