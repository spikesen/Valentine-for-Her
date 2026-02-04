'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type FloatingHeartsProps = {
  enabled?: boolean;
  count?: number;
  speedMultiplier?: number;
  sizeMultiplier?: number;
  opacity?: number;
};

type HeartConfig = {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  rotate: number;
};

export const FloatingHearts = ({
  enabled = true,
  count = 40,
  speedMultiplier = 1,
  sizeMultiplier = 1,
  opacity = 0.3,
}: FloatingHeartsProps) => {
  const [hearts, setHearts] = useState<HeartConfig[]>([]);

  useEffect(() => {
    if (!enabled) {
      setHearts([]);
      return;
    }

    const safeCount = Math.max(0, Math.min(120, Math.round(count)));
    const baseMinSize = 12;
    const baseMaxSize = 36;

    const colors = ['text-rose-600', 'text-rose-500', 'text-rose-400', 'text-red-600', 'text-red-500'];
    const newHearts = Array.from({ length: safeCount }).map((_, i) => {
      const rawSize = Math.random() * (baseMaxSize - baseMinSize) + baseMinSize;

      return {
        id: i,
        x: Math.random() * 100,
        size: rawSize * sizeMultiplier,
        duration: (Math.random() * 15 + 10) / Math.max(0.3, speedMultiplier),
        delay: Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotate: Math.random() * 360,
      };
    });

    setHearts(newHearts);
  }, [enabled, count, speedMultiplier, sizeMultiplier]);

  if (!enabled || hearts.length === 0) return null;

  const clampedOpacity = Math.max(0.1, Math.min(1, opacity));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '110vh', x: `${heart.x}vw`, opacity: 0, rotate: heart.rotate }}
          animate={{
            y: '-10vh',
            opacity: [0, clampedOpacity, 0],
            rotate: heart.rotate + 360,
            x: [`${heart.x}vw`, `${heart.x + (Math.random() * 10 - 5)}vw`, `${heart.x}vw`],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: 'linear',
          }}
          className={`absolute ${heart.color}`}
          style={{ fontSize: heart.size }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};
