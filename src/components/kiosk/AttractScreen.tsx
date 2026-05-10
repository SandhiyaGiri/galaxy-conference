import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import finzlyLogo from "../../assets/finzly-logo.png";

export default function AttractScreen() {
  const [phase, setPhase] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const easeOut = [0.22, 1, 0.36, 1] as const;

  // Animation phases:
  // 0: white screen with logo only (2s)
  // 1: purple circle expands (2s)
  // 2: text appears (2s)
  // 3: hold (1s)
  // Then loop back to 0
  const phaseDurations = [2000, 2000, 2000, 1000];

  useEffect(() => {
    if (dismissed) return;

    const timer = setTimeout(() => {
      setPhase((p) => (p + 1) % 4);
    }, phaseDurations[phase]);

    return () => clearTimeout(timer);
  }, [phase, dismissed]);

  const handleTap = () => {
    setDismissed(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: dismissed ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: dismissed ? 1.2 : 0.3,
        ease: "easeOut",
      }}
      className="fixed inset-0 z-[60] bg-white flex items-center justify-center overflow-hidden cursor-pointer"
      onClick={handleTap}
    >
      {/* Finzly logo — always visible */}
      <motion.img
        src={finzlyLogo}
        alt="Finzly"
        className="w-40 md:w-56 absolute"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Expanding purple circle — appears in phases 1+ */}
      <AnimatePresence>
        {(phase >= 1 || dismissed) && (
          <motion.div
            key="purple-circle"
            initial={{ clipPath: "circle(0% at 0% 0%)" }}
            animate={{
              clipPath: dismissed ? "circle(0% at 0% 0%)" : "circle(150% at 0% 0%)",
            }}
            exit={{ clipPath: "circle(0% at 0% 0%)" }}
            transition={{
              duration: dismissed ? 1.2 : 2,
              ease: easeOut,
            }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "hsl(263.4 70% 50.4%)" }}
          >
            {/* Text content — appears in phases 2+ and hides when dismissed */}
            <AnimatePresence>
              {phase >= 2 && !dismissed && (
                <motion.div
                  key="text-content"
                  className="text-center text-white px-8 max-w-3xl"
                  style={{ perspective: "800px" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Mix. Match. Launch. */}
                  <h1 className="text-5xl md:text-7xl font-black font-satoshi leading-tight mb-6">
                    {["Mix.", "Match.", "Launch."].map((word, i) => (
                      <motion.span
                        key={word}
                        className="inline-block"
                        initial={{ opacity: 0, y: 52, rotateX: -40 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{
                          delay: i * 0.18,
                          duration: 0.55,
                          ease: easeOut,
                        }}
                        style={{ transformOrigin: "bottom center", display: "inline-block", marginRight: "0.2em" }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </h1>

                  {/* Subtitle */}
                  <motion.p
                    className="text-xl md:text-2xl font-satoshi font-normal leading-snug mb-8"
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.6, duration: 0.6, ease: easeOut }}
                  >
                    Build your bank's future — one galaxy at a time.
                  </motion.p>

                  {/* Question */}
                  <motion.p
                    className="text-lg md:text-xl font-satoshi font-normal mb-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, type: "spring", stiffness: 100, damping: 12 }}
                  >
                    What's your next growth play?
                  </motion.p>

                  {/* Tap hint */}
                  <motion.p
                    className="text-sm font-satoshi opacity-75"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.7, duration: 0.5 }}
                  >
                    Tap anywhere to explore
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
