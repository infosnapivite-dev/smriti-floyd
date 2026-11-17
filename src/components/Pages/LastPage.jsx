import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import lastPageBg from '../../assets/8-last page.webp';
import deviderImg from '../../assets/devider.webp';
import paperPlaneImg from '../../assets/paper-plane.png';

// Exact vector Bézier path extracted directly from original PDF page 8 vector operators (with all 5 segments including the complete circular loop)
const pathD = "M -0.79,146.28 C 12.91,137.13 103.33,116.79 103.33,116.79 C 256.04,80.14 326.03,133.01 326.03,133.01 C 402.33,173.92 337.17,239.37 308.92,196.54 C 301.39,185.13 301.36,168.75 319.06,155.29 C 364.84,120.49 558.75,68.55 620.03,69.55";

// Calibrated flight progress mapping with pronounced graceful slowdown on the circle loop (s: ~0.38 -> 0.64)
const FLIGHT_PROGRESS_LUT = (() => {
  const steps = 1000;
  const sVals = [];
  const tVals = [0];
  const ds = 1 / steps;

  const speedAtS = (s) => {
    let base = 1.0;
    if (s < 0.12) {
      base = 0.35 + 0.65 * (s / 0.12);
    } else if (s > 0.88) {
      base = 0.35 + 0.65 * ((1 - s) / 0.12);
    }

    // Dip in speed specifically on the circle loop (s ≈ 0.38 to 0.64, center ~0.51)
    const center = 0.51;
    const width = 0.11;
    const dist = (s - center) / width;
    const dip = Math.exp(-0.5 * dist * dist);

    // Pronounced slow glide inside the circle loop (~74% reduction from cruising speed)
    const factor = 1 - 0.74 * dip;
    return Math.max(0.20, base * factor);
  };

  let accumT = 0;
  for (let i = 0; i <= steps; i++) {
    const s = i * ds;
    sVals.push(s);
    if (i > 0) {
      const v = speedAtS((i - 0.5) * ds);
      accumT += ds / v;
      tVals.push(accumT);
    }
  }

  const normT = tVals.map((t) => t / accumT);
  const lut = [];
  const lutSize = 200;
  for (let k = 0; k <= lutSize; k++) {
    const targetT = k / lutSize;
    let idx = normT.findIndex((t) => t >= targetT);
    if (idx === -1) idx = steps;
    lut.push(sVals[idx]);
  }
  return lut;
})();

const getProgressForTime = (timeFraction) => {
  const clamped = Math.max(0, Math.min(1, timeFraction));
  const lutSize = FLIGHT_PROGRESS_LUT.length - 1;
  const index = clamped * lutSize;
  const i0 = Math.floor(index);
  const i1 = Math.min(i0 + 1, lutSize);
  const frac = index - i0;
  return FLIGHT_PROGRESS_LUT[i0] * (1 - frac) + FLIGHT_PROGRESS_LUT[i1] * frac;
};

export default function LastPage() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });

  // Initial state: ready at start or resting at end (rotated slightly rightward +8°)
  const [planePos, setPlanePos] = useState({ x: -0.79, y: 146.28, angle: 32 });
  const [pathLength, setPathLength] = useState(1200);
  const [progress, setProgress] = useState(0);
  const [isFlying, setIsFlying] = useState(false);
  const [hasFlownOnce, setHasFlownOnce] = useState(false);
  const animFrameRef = useRef(null);
  const startTimeRef = useRef(null);

  // Measure path length on mount
  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      setPathLength(len);
      // If already flown, show full path; otherwise keep ready
      if (!hasFlownOnce) {
        const startPt = pathRef.current.getPointAtLength(0);
        setPlanePos({ x: startPt.x, y: startPt.y, angle: 32 });
      }
    }
  }, []);

  const flyPlane = () => {
    if (!pathRef.current) return;
    const path = pathRef.current;
    const totalLength = path.getTotalLength();
    setPathLength(totalLength);
    const duration = 4600; // 4.6s flight: fast approach, slow majestic loop-the-loop, smooth landing

    startTimeRef.current = performance.now();
    setIsFlying(true);
    setProgress(0);

    const animate = (time) => {
      const elapsed = time - startTimeRef.current;
      const rawProgress = Math.min(elapsed / duration, 1);

      // Calibrated progress with realistic slowdown on the circular loop
      const ease = getProgressForTime(rawProgress);

      setProgress(ease);

      const currentLen = ease * totalLength;
      const pt = path.getPointAtLength(currentLen);

      // Compute tangent angle along the path
      const ptNext = path.getPointAtLength(Math.min(totalLength, currentLen + 3));
      const ptPrev = path.getPointAtLength(Math.max(0, currentLen - 3));
      const dx = ptNext.x - ptPrev.x;
      const dy = ptNext.y - ptPrev.y;
      const tangentDeg = (Math.atan2(dy, dx) * 180) / Math.PI;

      // Align paper plane nose with tangent, rotated a little bit to the right side (+31.6°)
      const adjustedAngle = tangentDeg + 31.6;

      setPlanePos({ x: pt.x, y: pt.y, angle: adjustedAngle });

      if (rawProgress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setIsFlying(false);
        setHasFlownOnce(true);
        setProgress(1);
        setPlanePos({ x: 620.03, y: 69.55, angle: 32 });
      }
    };

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(animate);
  };

  // Trigger flight automatically when scrolled into view
  useEffect(() => {
    if (isInView && !hasFlownOnce) {
      const timer = setTimeout(() => {
        flyPlane();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasFlownOnce]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full aspect-[3000/5400] overflow-hidden select-none bg-[#f4ece1]">
      {/* Background artwork (terrace with sunset view, table and chairs) */}
      <img
        src={lastPageBg}
        alt="Smriti & Floyd Wedding Closing"
        className="absolute inset-0 w-full h-full object-fill pointer-events-none gpu-accelerated"
        loading="eager"
      />

      {/* Trailing Paper Airplane & Dynamic Dashed Path in Exact Page Coordinates (720 x 1296) */}
      <svg
        viewBox="0 0 720 1296"
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        fill="none"
      >
        <defs>
          {/* Dynamic luminance mask: Path is completely hidden initially and reveals synchronously behind the moving plane */}
          <mask id="plane-trail-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="720" height="1296">
            <rect x="0" y="0" width="720" height="1296" fill="black" />
            <path
              d={pathD}
              fill="none"
              stroke="white"
              strokeWidth="45"
              strokeLinecap="round"
              strokeDasharray={`${pathLength} ${pathLength}`}
              strokeDashoffset={pathLength * (1 - (hasFlownOnce && !isFlying ? 1 : progress))}
            />
          </mask>
        </defs>

        {/* Dashed Flight Path from Original PDF vector data */}
        <path
          ref={pathRef}
          d={pathD}
          stroke="#1e2c3d"
          strokeWidth="2.2"
          strokeDasharray="4.5 5.5"
          strokeLinecap="round"
          opacity={(hasFlownOnce && !isFlying) || progress > 0.005 ? 0.85 : 0}
          mask="url(#plane-trail-mask)"
        />

        {/* Flying Paper Airplane with realistic tangent heading & interactive touch */}
        <g
          transform={`translate(${planePos.x}, ${planePos.y}) rotate(${planePos.angle})`}
          className="cursor-pointer pointer-events-auto"
          style={{ opacity: isFlying || hasFlownOnce ? 1 : 0 }}
          onClick={flyPlane}
        >
          <motion.image
            href={paperPlaneImg}
            x="-14"
            y="-46"
            width="96"
            height="64"
            className="drop-shadow-md select-none"
            animate={
              !isFlying && hasFlownOnce
                ? {
                    y: [-46, -50, -46],
                    rotate: [0, 2, 0],
                  }
                : {}
            }
            transition={
              !isFlying && hasFlownOnce
                ? { repeat: Infinity, duration: 3.5, ease: 'easeInOut' }
                : {}
            }
          />
        </g>
      </svg>

      {/* Typography Overlay */}
      <div className="absolute top-[22%] inset-x-0 flex flex-col items-center text-center px-8 desktop-page-overlay">
        {/* Quote */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif italic text-sm sm:text-base md:text-lg text-[#183654] leading-relaxed max-w-[300px] mb-4"
        >
          Our paths led us to each other,<br />
          and now we can’t wait for yours<br />
          to lead you to us on our special day.
        </motion.p>

        {/* Couple Signature */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[17.5px] sm:text-xl tracking-[0.16em] text-[#916a3c] font-semibold uppercase mb-4 inline-block transform scale-y-[1.08]"
        >
          Smriti & Floyd
        </motion.h2>

        {/* Divider */}
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          src={deviderImg}
          alt="Divider"
          className="w-28 sm:w-32 object-contain pointer-events-none"
        />
      </div>
    </section>
  );
}
