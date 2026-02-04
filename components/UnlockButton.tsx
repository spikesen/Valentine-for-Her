'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface UnlockButtonProps {
  onClick: () => void;
  label: string;
}

export const UnlockButton = ({ onClick, label }: UnlockButtonProps) => {
  const handleClick = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#DC143C', '#FFE4E1', '#FFD700'],
    });
    onClick();
  };

  return (
    <motion.button
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(220, 20, 60, 0.4)" }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="relative group px-8 py-4 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-full font-bold text-lg shadow-lg flex items-center gap-3 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <Sparkles className="w-5 h-5 text-yellow-300" />
      <span>{label}</span>
      <Sparkles className="w-5 h-5 text-yellow-300" />
    </motion.button>
  );
};
