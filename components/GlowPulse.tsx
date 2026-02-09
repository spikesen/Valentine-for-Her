'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface GlowPulseProps {
  isActive: boolean;
  color?: string;
  intensity?: number;
}

export const GlowPulse = ({
  isActive,
  color = 'rgba(220, 20, 60, 0.5)',
  intensity = 1,
}: GlowPulseProps) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!isActive) {
      setScale(1);
      return;
    }

    const interval = setInterval(() => {
      setScale((prev) => (prev === 1 ? 1 + intensity * 0.3 : 1));
    }, 600);

    return () => clearInterval(interval);
  }, [isActive, intensity]);

  return (
    <motion.div
      animate={{ scale }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 pointer-events-none"
      style={{
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        zIndex: -1,
      }}
    />
  );
};
