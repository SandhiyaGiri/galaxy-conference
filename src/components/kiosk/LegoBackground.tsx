import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LegoBrick, { type BrickColor } from "./LegoBrick";

const BRICK_COLORS: BrickColor[] = [
  "red", "blue", "yellow", "green", "orange", "purple"
];

function FloatingBrick({ delay, x, duration, color, size, rotate }: {
  delay: number; x: string; duration: number; color: BrickColor; size: number; rotate: number
}) {
  const initialY = -20 - (Math.random() * 20);
  return (
    <motion.div
      className="opacity-[0.08]"
      initial={{ y: `${initialY}vh`, left: x, x: 0, rotate: 0 }}
      animate={{
        y: "110vh",
        rotate,
        x: [-15, 15, -15]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
        x: { duration: duration / 3, repeat: Infinity, ease: "easeInOut" }
      }}
      style={{ zIndex: 0, position: "absolute" }}
    >
      <LegoBrick color={color} width={size} height={size * 0.4} studsX={2} />
    </motion.div>
  );
}

export default function LegoBackground() {
  const [bricks, setBricks] = useState<any[]>([]);
  const durationPool = [30, 40, 50, 60];

  useEffect(() => {
    const NUM_COLS = 9;
    const colWidth = 100 / NUM_COLS;
    const newBricks = Array.from({ length: 36 }).map((_, i) => {
      const col = i % NUM_COLS;
      const center = col * colWidth + colWidth / 2;
      // small jitter within each column cell so bricks don't stack perfectly
      const jitter = (Math.random() - 0.5) * colWidth * 0.5;
      return {
        id: i,
        x: `${Math.max(2, Math.min(98, center + jitter))}%`,
        delay: -(durationPool[i % durationPool.length] * Math.random()),
        duration: 38 + Math.random() * 24,
        color: BRICK_COLORS[i % BRICK_COLORS.length],
        size: 60 + Math.random() * 50,
        rotate: Math.random() * 360,
      };
    });
    setBricks(newBricks);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1, background: "linear-gradient(to bottom, #f8fafc 0%, #f1f5f9 100%)" }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.03)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.03)_0%,transparent_50%)]" />

      <AnimatePresence>
        {bricks.map((brick) => (
          <FloatingBrick key={brick.id} {...brick} />
        ))}
      </AnimatePresence>
    </div>
  );
}
