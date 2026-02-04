'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

type CursorTrailProps = {
  enabled?: boolean;
  size?: number;
  heartBurstOnClick?: boolean;
};

type CursorHeart = {
  id: number;
  x: number;
  y: number;
  delay: number;
};

export const CursorTrail = ({
  enabled = true,
  size = 1,
  heartBurstOnClick = true,
}: CursorTrailProps) => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const [hearts, setHearts] = useState<CursorHeart[]>([]);

  useEffect(() => {
    if (!enabled) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY, enabled]);

  useEffect(() => {
    if (!enabled || !heartBurstOnClick) return;

    let heartId = 0;

    const spawnBurst = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const burst = Array.from({ length: 6 }).map((_, index) => ({
        id: heartId++,
        x: clientX + (Math.random() * 32 - 16),
        y: clientY + (Math.random() * 32 - 16),
        delay: index * 0.03,
      }));

      setHearts((prev) => [...prev, ...burst]);
    };

    window.addEventListener('click', spawnBurst);
    return () => window.removeEventListener('click', spawnBurst);
  }, [enabled, heartBurstOnClick]);

  if (!enabled) return null;

  const haloSize = 24 * size;
  const dotSize = 8 * size;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 bg-rose-500/20 rounded-full pointer-events-none z-[9999] mix-blend-multiply"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          width: haloSize,
          height: haloSize,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 bg-rose-600 rounded-full pointer-events-none z-[9999]"
        style={{
          x: useSpring(cursorX, { damping: 40, stiffness: 400 }),
          y: useSpring(cursorY, { damping: 40, stiffness: 400 }),
          translateX: '-50%',
          translateY: '-50%',
          width: dotSize,
          height: dotSize,
        }}
      />
      {hearts.map((heart) => (
        <motion.span
          key={heart.id}
          className="fixed pointer-events-none z-[9999] text-rose-500"
          initial={{ x: heart.x, y: heart.y, opacity: 0, scale: 0.7 }}
          animate={{
            y: heart.y - 80,
            opacity: [0, 1, 0],
            scale: [0.7, 1.1, 0.8],
          }}
          transition={{
            duration: 1.4,
            delay: heart.delay,
            ease: 'easeOut',
          }}
          onAnimationComplete={() => {
            setHearts((prev) => prev.filter((h) => h.id !== heart.id));
          }}
        >
          ❤️
        </motion.span>
      ))}
    </>
  );
};
