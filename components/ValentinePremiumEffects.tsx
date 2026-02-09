'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const PremiumHeartEffect = () => {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: i * 0.1,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{
            opacity: 0,
            y: -20,
            x: `${heart.x}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            y: window.innerHeight + 100,
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: heart.delay,
            ease: 'easeIn',
          }}
          className="absolute text-4xl"
          style={{
            left: `${heart.x}%`,
            filter: 'drop-shadow(0 0 4px rgba(220, 20, 60, 0.4))',
          }}
        >
          💕
        </motion.div>
      ))}
    </div>
  );
};

export const SparkleEffect = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 1,
            scale: 0.5,
          }}
          animate={{
            opacity: [1, 0],
            scale: [0.5, 1],
            x: (Math.random() - 0.5) * 200,
            y: (Math.random() - 0.5) * 200,
          }}
          transition={{
            duration: 2,
            delay: i * 0.05,
            repeat: Infinity,
            repeatDelay: 3,
          }}
          className="absolute text-2xl"
          style={{
            left: '50%',
            top: '50%',
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
};

interface ConfettiParticle {
  id: number;
  type: 'heart' | 'star' | 'sparkle';
  emoji: string;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

export const PremiumConfetti = ({ trigger }: { trigger: boolean }) => {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);

  useEffect(() => {
    if (!trigger) return;

    const emojis = [
      { type: 'heart' as const, emoji: '💕' },
      { type: 'heart' as const, emoji: '💗' },
      { type: 'heart' as const, emoji: '❤️' },
      { type: 'star' as const, emoji: '⭐' },
      { type: 'sparkle' as const, emoji: '✨' },
    ];

    const newParticles: ConfettiParticle[] = Array.from({ length: 50 }, (_, i) => {
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      return {
        id: i,
        type: emoji.type,
        emoji: emoji.emoji,
        x: Math.random() * 100,
        y: -20,
        duration: Math.random() * 2 + 3,
        delay: i * 0.05,
      };
    });

    setParticles(newParticles);

    const timer = setTimeout(() => setParticles([]), 5000);
    return () => clearTimeout(timer);
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            opacity: 1,
            x: `${particle.x}%`,
            y: `${particle.y}%`,
          }}
          animate={{
            opacity: 0,
            y: window.innerHeight + 100,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: 'easeIn',
          }}
          className="absolute text-3xl"
          style={{
            filter: 'drop-shadow(0 0 6px rgba(220, 20, 60, 0.6))',
          }}
        >
          {particle.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export const FloatingHeartOrbit = () => {
  const hearts = ['💕', '💗', '❤️', '🥰', '💖'];

  return (
    <div className="relative w-32 h-32 mx-auto">
      {hearts.map((heart, i) => (
        <motion.div
          key={i}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-0"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="absolute text-4xl"
            style={{
              top: '0',
              left: '50%',
              transform: `translateX(-50%) rotate(${(i / hearts.length) * 360}deg) translateY(-50px)`,
            }}
          >
            {heart}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};
