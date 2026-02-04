'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CursorTrail = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-rose-500/20 rounded-full pointer-events-none z-[9999] mix-blend-multiply"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-rose-600 rounded-full pointer-events-none z-[9999]"
        style={{ 
          x: useSpring(cursorX, { damping: 40, stiffness: 400 }), 
          y: useSpring(cursorY, { damping: 40, stiffness: 400 }),
          translateX: '-50%', 
          translateY: '-50%' 
        }}
      />
    </>
  );
};
