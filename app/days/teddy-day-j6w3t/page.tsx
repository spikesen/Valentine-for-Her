'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDayGate } from '@/hooks/useDayGate';
import { useProgress } from '@/hooks/useProgress';
import { celebrateDay } from '@/hooks/useCelebrate';
import SaveToast from '@/components/SaveToast';
import confetti from 'canvas-confetti';

const ParticleField = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 8,
            repeat: Infinity,
            delay: i * 0.1,
          }}
          className="absolute text-2xl"
        >
          🧸
        </motion.div>
      ))}
    </div>
  );
};

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {[
        { delay: 0, size: 400, color: 'from-red-300/20' },
        { delay: 0.5, size: 300, color: 'from-pink-300/20' },
        { delay: 1, size: 350, color: 'from-rose-300/20' },
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
            top: `${20 + i * 30}%`,
            left: `${10 + i * 35}%`,
          }}
        />
      ))}
    </div>
  );
};

const outfits = [
  { emoji: '👗', name: 'Pink Dress', color: 'pink' },
  { emoji: '🧥', name: 'Cozy Sweater', color: 'amber' },
  { emoji: '🎀', name: 'Fancy Ribbon', color: 'rose' },
  { emoji: '🧢', name: 'Cool Hat', color: 'blue' },
];

export default function TeddyDayPage() {
  const [teddyName, setTeddyName] = useState('');
  const [selectedOutfit, setSelectedOutfit] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'customize' | 'finale'>('intro');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const triggerConfetti = () => {
    confetti({
      origin: { y: 0.6 },
      spread: 100,
      colors: ['#FF69B4', '#FFB6C1', '#FFC0CB', '#FF1493'],
      particleCount: 100,
    });
  };

  const { completeDay } = useProgress();
  const [celebrated, setCelebrated] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    if (currentPhase === 'finale' && !celebrated) {
      try { completeDay(4, { response: 'Teddy Day celebrated' }); } catch {}
      celebrateDay(4).then(() => { setCelebrated(true); setSaveToast(true); }).catch(() => { setCelebrated(true); setSaveToast(true); });
    }
  }, [currentPhase, celebrated, completeDay]);

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 text-rose-900 relative overflow-hidden">
      <AnimatedBackground />
      <ParticleField />

      <header className="sticky top-0 z-40 bg-gradient-to-r from-white/80 via-pink-50/50 to-white/80 backdrop-blur-xl border-b border-rose-200/50 px-4 py-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-2 text-rose-600 hover:text-rose-700 font-medium transition-all"
          >
            <motion.div whileHover={{ x: -4 }}>
              ←
            </motion.div>
            <span className="group-hover:underline">Back to Journey</span>
          </Link>
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-rose-400 font-black">Day 4 - Premium Experience</p>
            <p className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-500">
              🧸 Teddy Day Special
            </p>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMusicPlaying(!isMusicPlaying)}
            className="p-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-500 text-white shadow-lg hover:shadow-xl"
          >
            {isMusicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </motion.button>
        </div>
      </header>

      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-12 gap-12 min-h-[calc(100vh-80px)]">
        <AnimatePresence mode="wait">
          {currentPhase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-3xl"
            >
              <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 3, repeat: Infinity }} className="mb-8">
                <div className="text-9xl drop-shadow-2xl filter">🧸</div>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-serif font-black mb-6 leading-tight">
                <span className="text-rose-900">My Soft</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-500">Place to Fall</span>
              </h1>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="space-y-6 mb-8">
                <p className="text-2xl font-serif italic text-rose-700">
                  "Wrap me in your warmth, hold me in your love."
                </p>
                <p className="text-lg text-rose-600/80">
                  When I'm not there to hold you, let this teddy remind you that my arms are always there for you.
                </p>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(220, 20, 60, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPhase('customize')}
                className="px-10 py-4 bg-gradient-to-r from-rose-600 to-pink-500 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 mx-auto group"
              >
                Create Your Teddy
                <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight size={20} />
                </motion.div>
              </motion.button>
            </motion.div>
          )}

          {currentPhase === 'customize' && (
            <motion.div
              key="customize"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full flex flex-col items-center gap-12 max-w-2xl"
            >
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-rose-900 mb-2">Build Your Teddy</h2>
                <p className="text-rose-600">Give it a name and dress it up for you</p>
              </div>

              <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity }} className="text-8xl">
                🧸
              </motion.div>

              <div className="w-full space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-rose-700 mb-2">What will you name your teddy?</label>
                  <motion.input
                    type="text"
                    value={teddyName}
                    onChange={(e) => setTeddyName(e.target.value)}
                    placeholder="e.g., Love Bear, Cuddle Buddy..."
                    className="w-full px-6 py-3 rounded-xl border-2 border-rose-200 focus:border-rose-600 focus:outline-none text-rose-900 placeholder-rose-400 transition-all"
                    whileFocus={{ boxShadow: '0 0 20px rgba(220, 20, 60, 0.2)' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-rose-700 mb-4">Pick an outfit</label>
                  <div className="grid grid-cols-4 gap-4">
                    {outfits.map((outfit, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedOutfit(idx)}
                        className={`p-4 rounded-xl text-4xl transition-all ${
                          selectedOutfit === idx
                            ? 'bg-rose-600 shadow-lg scale-105'
                            : 'bg-white/70 border-2 border-rose-200 hover:border-rose-400'
                        }`}
                      >
                        {outfit.emoji}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: teddyName.trim().length > 0 ? 1 : 0.5 }}
                className="flex gap-4 w-full"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={teddyName.trim().length === 0}
                  onClick={() => {
                    triggerConfetti();
                    setCurrentPhase('finale');
                  }}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-rose-600 to-pink-500 text-white rounded-full font-bold shadow-xl hover:shadow-2xl disabled:opacity-50 transition-all"
                >
                  Complete My Teddy 💝
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPhase('intro')}
                  className="px-6 py-4 bg-white border-2 border-rose-600 text-rose-600 rounded-full font-bold hover:bg-rose-50 transition-all"
                >
                  Back
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {currentPhase === 'finale' && (
            <motion.div
              key="finale"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-2xl"
            >
                <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-9xl">
                  🧸
                </motion.div>

              <h2 className="text-5xl md:text-6xl font-serif font-black text-rose-900 mb-4">
                Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-500">{teddyName || 'Your Bear'}</span>!
              </h2>

              <p className="text-xl text-rose-700 mb-8">
                This teddy will be your warm hug whenever I can't be there. Every time you see it, remember that my heart is always holding you.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-500 text-white rounded-full font-semibold hover:shadow-lg transition-all"
                >
                  Continue Our Journey
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <SaveToast visible={saveToast} message="Saved to your memories" onClose={() => setSaveToast(false)} />
    </main>
  );
}
