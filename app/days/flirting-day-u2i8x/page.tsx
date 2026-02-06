'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { useState, useEffect } from 'react';

import { useProgress } from '@/hooks/useProgress';
import { celebrateDay } from '@/hooks/useCelebrate';
import SaveToast from '@/components/SaveToast';
import confetti from 'canvas-confetti';

const pickupLines = [
  "Are you a magician? Because whenever I look at you, everyone else disappears.",
  "Do you have a map? I just keep getting lost in your eyes.",
  "If you were a vegetable, you'd be a cute-cumber!",
  "On a scale of 1 to 10, you're an 11.",
  "Do you believe in love at first sight, or should I walk by again?",
];

const ParticleField = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000), opacity: 0 }}
        animate={{ x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000), opacity: [0, 1, 0] }}
        transition={{ duration: Math.random() * 4 + 8, repeat: Infinity, delay: i * 0.1 }}
        className="absolute text-2xl"
      >
        😏
      </motion.div>
    ))}
  </div>
);

const AnimatedBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    {[
      { delay: 0, size: 400, color: 'from-pink-400/20' },
      { delay: 0.5, size: 300, color: 'from-red-400/20' },
    ].map((orb, i) => (
      <motion.div
        key={i}
        animate={{ rotate: 360 }}
        transition={{ duration: (i + 1) * 20, repeat: Infinity, ease: 'linear' }}
        className={`absolute bg-gradient-to-r ${orb.color} to-transparent rounded-full blur-3xl`}
        style={{ width: orb.size, height: orb.size, top: `${20 + i * 30}%`, left: `${10 + i * 35}%` }}
      />
    ))}
  </div>
);

export default function FlirtingDayPage() {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'flirt' | 'finale'>('intro');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const { completeDay } = useProgress();
  const [celebrated, setCelebrated] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    if (currentPhase === 'finale' && !celebrated) {
      try { completeDay(12, { response: 'Flirting Day celebrated' }); } catch {}
      celebrateDay(12).then(() => { setCelebrated(true); setSaveToast(true); }).catch(() => { setCelebrated(true); setSaveToast(true); });
    }
  }, [currentPhase, celebrated, completeDay]);

  const triggerConfetti = () => {
    confetti({ origin: { y: 0.6 }, spread: 100, colors: ['#EC4899', '#F43F5E', '#FB7185', '#FCA5C3'], particleCount: 100 });
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 text-pink-900 relative overflow-hidden">
      <AnimatedBackground />
      <ParticleField />

      <header className="sticky top-0 z-40 bg-gradient-to-r from-white/80 via-pink-50/50 to-white/80 backdrop-blur-xl border-b border-pink-200/50 px-4 py-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium transition-all">
            <motion.div whileHover={{ x: -4 }}>←</motion.div>
            <span className="group-hover:underline">Back</span>
          </Link>
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-pink-400 font-black">Day 12 - Playful</p>
            <p className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-500">😏 Flirting Day</p>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsMusicPlaying(!isMusicPlaying)}
            className="p-3 rounded-full bg-gradient-to-r from-pink-600 to-red-500 text-white shadow-lg"
          >
            {isMusicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </motion.button>
        </div>
      </header>

      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-12 gap-12 min-h-[calc(100vh-80px)]">
        <AnimatePresence mode="wait">
          {currentPhase === 'intro' && (
            <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl">
              <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }} className="mb-8 text-9xl">😏</motion.div>
              <h1 className="text-5xl md:text-7xl font-serif font-black mb-6">Get Ready To Be Wooed</h1>
              <p className="text-lg text-pink-600 mb-8">Who says flirting stops when you're already in love? Let's fall for each other all over again!</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setCurrentPhase('flirt');
                  triggerConfetti();
                }}
                className="px-10 py-4 bg-gradient-to-r from-pink-600 to-red-500 text-white rounded-full font-bold text-lg shadow-xl inline-flex items-center gap-3"
              >
                Spin The Wheel
                <ArrowRight size={20} />
              </motion.button>
            </motion.div>
          )}

          {currentPhase === 'flirt' && (
            <motion.div key="flirt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center gap-8 max-w-2xl">
              <h2 className="text-4xl font-serif font-bold text-pink-900">Pickup Line Roulette</h2>
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                transition={{ rotate: { duration: 0.5 }, scale: { duration: 2, repeat: Infinity } }}
                className="text-8xl"
              >
                💕
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={currentLine}
                className="w-full p-8 bg-white/80 backdrop-blur-md border-3 border-pink-400 rounded-2xl text-center"
              >
                <p className="text-2xl font-serif italic text-pink-800">" {pickupLines[currentLine]} "</p>
              </motion.div>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setCurrentLine((currentLine - 1 + pickupLines.length) % pickupLines.length);
                    triggerConfetti();
                  }}
                  className="px-6 py-3 bg-white border-2 border-pink-600 text-pink-600 rounded-full font-bold hover:bg-pink-50"
                >
                  Previous
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setCurrentLine((currentLine + 1) % pickupLines.length);
                    triggerConfetti();
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-pink-600 to-red-500 text-white rounded-full font-bold shadow-lg"
                >
                  Next
                </motion.button>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setCurrentPhase('finale');
                  triggerConfetti();
                  triggerConfetti();
                }}
                className="w-full px-8 py-4 bg-gradient-to-r from-pink-600 to-red-500 text-white rounded-full font-bold shadow-xl"
              >
                You've Won Me Over 💋
              </motion.button>
            </motion.div>
          )}

          {currentPhase === 'finale' && (
            <motion.div key="finale" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl">
              <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-9xl mb-8">😘</motion.div>
              <h2 className="text-5xl font-serif font-black text-pink-900 mb-6">Mission Accomplished!</h2>
              <p className="text-xl text-pink-700 mb-8">You were never hard to woo, Paro. You had me from the very beginning. 💕</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-600 to-red-500 text-white rounded-full font-semibold hover:shadow-lg"
              >
                Continue Journey
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <SaveToast visible={saveToast} message="Saved to your memories" onClose={() => setSaveToast(false)} />
    </main>
  );
}
