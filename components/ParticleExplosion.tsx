'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  duration: number;
  delay: number;
}

interface ParticleExplosionProps {
  isActive: boolean;
  emoji?: string;
  particleCount?: number;
  duration?: number;
}

export const ParticleExplosion = ({
  isActive,
  emoji = '💕',
  particleCount = 30,
  duration = 3,
}: ParticleExplosionProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!isActive) return;

    const newParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * window.innerWidth,
      y: (Math.random() - 0.5) * window.innerHeight,
      emoji,
      duration: Math.random() * 2 + duration,
      delay: Math.random() * 0.3,
    }));

    setParticles(newParticles);

    const timer = setTimeout(() => setParticles([]), (duration + 1) * 1000);
    return () => clearTimeout(timer);
  }, [isActive, particleCount, duration, emoji]);

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{
            opacity: 0,
            x: particle.x,
            y: particle.y,
            scale: 0,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: 'easeOut',
          }}
          className="fixed pointer-events-none text-4xl"
          style={{
            left: '50%',
            top: '50%',
            zIndex: 50,
          }}
        >
          {particle.emoji}
        </motion.div>
      ))}
    </>
  );
};
