'use client';

import { useState, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ParticleFieldProps {
  count?: number;
  emoji?: string;
  duration?: number;
}

/**
 * Reusable ParticleField component that safely handles window-dependent rendering.
 * Prevents "window is not defined" errors during SSR.
 */
export const ParticleField = ({ count = 20, emoji = '✨', duration = 4 }: ParticleFieldProps) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);

  if (!width || !height) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * width,
            y: Math.random() * height,
            opacity: 0,
          }}
          animate={{
            x: Math.random() * width,
            y: Math.random() * height,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * duration + duration,
            repeat: Infinity,
            delay: i * 0.1,
          }}
          className="absolute text-2xl"
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  );
};
