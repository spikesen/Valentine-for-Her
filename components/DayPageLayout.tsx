'use client';

import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart } from 'lucide-react';
import Link from 'next/link';
import { ValentineDay } from '@/data/valentineDays';

interface DayPageLayoutProps {
  day: ValentineDay;
  children: ReactNode;
  onComplete?: () => void;
}

export const DayPageLayout = ({
  day,
  children,
  onComplete,
}: DayPageLayoutProps) => {
  const [showContent, setShowContent] = useState(true);

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {[
          { size: 400, color: 'from-rose-400/20', top: '0%', left: '0%' },
          { size: 300, color: 'from-pink-400/20', top: '40%', right: '5%' },
          { size: 350, color: 'from-red-400/20', bottom: '0%', left: '20%' },
        ].map((orb, i) => (
          <motion.div
            key={i}
            animate={{ rotate: 360 }}
            transition={{
              duration: (i + 1) * 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className={`absolute bg-gradient-to-r ${orb.color} to-transparent rounded-full blur-3xl`}
            style={{
              width: orb.size,
              height: orb.size,
              top: orb.top,
              left: orb.left,
              right: orb.right ? orb.right : 'auto',
              bottom: orb.bottom ? orb.bottom : 'auto',
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-rose-200 px-4 py-4 shadow-sm"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-medium transition-colors group"
          >
            <motion.div whileHover={{ x: -3 }} className="group-hover:text-rose-700">
              <ArrowLeft className="w-5 h-5" />
            </motion.div>
            Back
          </Link>

          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-center flex-1"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-rose-400 font-bold">
              Day {day.id}
            </p>
            <p className="text-2xl font-serif font-bold text-rose-900 flex items-center justify-center gap-2">
              <span>{day.emoji}</span>
              {day.name}
            </p>
          </motion.div>

          <div className="w-12" /> {/* Spacer for alignment */}
        </div>
      </motion.header>

      {/* Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 min-h-[calc(100vh-80px)]"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative hearts */}
      <div className="fixed bottom-4 left-4 right-4 flex justify-center gap-4 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
            }}
            className="text-2xl"
          >
            {['❤️', '💕', '💖'][i]}
          </motion.div>
        ))}
      </div>
    </main>
  );
};
