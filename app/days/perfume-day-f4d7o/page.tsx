'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { useState, useEffect } from 'react';

import { useProgress } from '@/hooks/useProgress';
import { celebrateDay } from '@/hooks/useCelebrate';
import SaveToast from '@/components/SaveToast';
import confetti from 'canvas-confetti';

const scents = [
  { emoji: '🌹', name: 'Rose', personality: 'Romantic & Timeless' },
  { emoji: '🌿', name: 'Vanilla', personality: 'Warm & Comforting' },
  { emoji: '🌊', name: 'Ocean Breeze', personality: 'Fresh & Free-Spirited' },
  { emoji: '🌸', name: 'Jasmine', personality: 'Elegant & Mysterious' },
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
        💨
      </motion.div>
    ))}
  </div>
);

const AnimatedBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    {[
      { delay: 0, size: 400, color: 'from-purple-400/20' },
      { delay: 0.5, size: 300, color: 'from-violet-400/20' },
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

export default function PerfumeDayPage() {
  const [selectedScent, setSelectedScent] = useState<number | null>(null);
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'quiz' | 'finale'>('intro');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const { completeDay } = useProgress();
  const [celebrated, setCelebrated] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    if (currentPhase === 'finale' && !celebrated) {
      try { completeDay(11, { response: 'Perfume Day celebrated' }); } catch {}
      celebrateDay(11).then(() => { setCelebrated(true); setSaveToast(true); }).catch(() => { setCelebrated(true); setSaveToast(true); });
    }
  }, [currentPhase, celebrated, completeDay]);

  const triggerConfetti = () => {
    confetti({ origin: { y: 0.6 }, spread: 100, colors: ['#A78BFA', '#C084FC', '#D8B4FE'], particleCount: 100 });
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 text-purple-900 relative overflow-hidden">
      <AnimatedBackground />
      <ParticleField />

      <header className="sticky top-0 z-40 bg-gradient-to-r from-white/80 via-purple-50/50 to-white/80 backdrop-blur-xl border-b border-purple-200/50 px-4 py-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-all">
            <motion.div whileHover={{ x: -4 }}>←</motion.div>
            <span className="group-hover:underline">Back</span>
          </Link>
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-purple-400 font-black">Day 11 - Scent</p>
            <p className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-500">💨 Perfume Day</p>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsMusicPlaying(!isMusicPlaying)}
            className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-violet-500 text-white shadow-lg"
          >
            {isMusicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </motion.button>
        </div>
      </header>

      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-12 gap-12 min-h-[calc(100vh-80px)]">
        <AnimatePresence mode="wait">
          {currentPhase === 'intro' && (
            <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl">
              <motion.div animate={{ y: [-10, 10, -10] }} className="mb-8 text-9xl">💨</motion.div>
              <h1 className="text-5xl md:text-7xl font-serif font-black mb-6">Your Scent Personality</h1>
              <p className="text-lg text-purple-600 mb-8">Your scent is my favorite perfume. It's the smell of home.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setCurrentPhase('quiz');
                  triggerConfetti();
                }}
                className="px-10 py-4 bg-gradient-to-r from-purple-600 to-violet-500 text-white rounded-full font-bold text-lg shadow-xl inline-flex items-center gap-3"
              >
                Take The Quiz
                <ArrowRight size={20} />
              </motion.button>
            </motion.div>
          )}

          {currentPhase === 'quiz' && (
            <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center gap-8 max-w-2xl">
              <h2 className="text-4xl font-serif font-bold text-purple-900">Which Scent Are You?</h2>
              <div className="grid grid-cols-2 gap-4 w-full">
                {scents.map((scent, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => {
                      setSelectedScent(idx);
                      triggerConfetti();
                      setTimeout(() => setCurrentPhase('finale'), 500);
                    }}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      selectedScent === idx ? 'border-purple-600 bg-purple-50' : 'border-purple-200 hover:border-purple-400'
                    }`}
                  >
                    <p className="text-5xl mb-2">{scent.emoji}</p>
                    <p className="font-semibold text-purple-900">{scent.name}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {currentPhase === 'finale' && selectedScent !== null && (
            <motion.div key="finale" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl">
              <motion.div className="text-8xl mb-8">{scents[selectedScent].emoji}</motion.div>
              <h2 className="text-5xl font-serif font-bold text-purple-900 mb-4">{scents[selectedScent].name}</h2>
              <p className="text-xl text-purple-700 mb-8">Personality: {scents[selectedScent].personality}</p>
              <p className="text-lg text-purple-600 mb-8">No matter which scent you are, you're my favorite fragrance in this world. 💜</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-500 text-white rounded-full font-semibold hover:shadow-lg"
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
