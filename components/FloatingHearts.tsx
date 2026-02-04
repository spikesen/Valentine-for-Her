'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const FloatingHearts = () => {
  const [hearts, setHearts] = useState<{ id: number; x: number; size: number; duration: number; delay: number; color: string; rotate: number }[]>([]);

  useEffect(() => {
    const colors = ['text-rose-600', 'text-rose-500', 'text-rose-400', 'text-red-600', 'text-red-500'];
    const newHearts = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 24 + 12,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: Math.random() * 360,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '110vh', x: `${heart.x}vw`, opacity: 0, rotate: heart.rotate }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.7, 0],
            rotate: heart.rotate + 360,
            x: [`${heart.x}vw`, `${heart.x + (Math.random() * 10 - 5)}vw`, `${heart.x}vw`]
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: 'linear',
          }}
          className={`absolute ${heart.color} opacity-30`}
          style={{ fontSize: heart.size }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};
