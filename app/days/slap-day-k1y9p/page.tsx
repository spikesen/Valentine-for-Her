'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { useState, useEffect } from 'react';

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
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            opacity: 0,
          }}
          animate={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 8,
            repeat: Infinity,
            delay: i * 0.1,
          }}
          className="absolute text-2xl"
        >
          ✋
        </motion.div>
      ))}
    </div>
  );
};

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {[
        { delay: 0, size: 400, color: 'from-purple-400/20' },
        { delay: 0.5, size: 300, color: 'from-fuchsia-400/20' },
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

const badVibes = ['Negativity', 'Self-doubt', 'Procrastination', 'Stress', 'Worry', 'Fear'];
const funnyMemes = [
  '😂 Us being silly together',
  '🤪 When you laugh at your own jokes',
  '😎 When we both get the same vibe',
  '💀 That one embarrassing moment',
  '😂 Our inside jokes nobody gets',
  '🎉 Every moment with you',
];

export default function SlapDayPage() {
  const [slapCount, setSlapCount] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'slap' | 'finale'>('intro');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const { completeDay } = useProgress();
  const [celebrated, setCelebrated] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    if (currentPhase === 'finale' && !celebrated) {
      try { completeDay(9, { response: 'Slap Day celebrated' }); } catch {}
      celebrateDay(9).then(() => { setCelebrated(true); setSaveToast(true); }).catch(() => { setCelebrated(true); setSaveToast(true); });
    }
  }, [currentPhase, celebrated, completeDay]);

  const triggerConfetti = () => {
    confetti({
      origin: { y: 0.6 },
      spread: 100,
      colors: ['#A78BFA', '#EC4899', '#F97316', '#FBBF24'],
      particleCount: 100,
    });
  };

  const handleSlap = () => {
    setSlapCount(slapCount + 1);
    triggerConfetti();
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50 text-purple-900 relative overflow-hidden">
      <AnimatedBackground />
      <ParticleField />

      <header className="sticky top-0 z-40 bg-gradient-to-r from-white/80 via-purple-50/50 to-white/80 backdrop-blur-xl border-b border-purple-200/50 px-4 py-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-all"
          >
            <motion.div whileHover={{ x: -4 }}>
              ←
            </motion.div>
            <span className="group-hover:underline">Back to Journey</span>
          </Link>
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-purple-400 font-black">Day 9 - Fun Times</p>
            <p className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
              ✋ Slap Day Special
            </p>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMusicPlaying(!isMusicPlaying)}
            className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg hover:shadow-xl"
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
              <motion.div animate={{ y: [-10, 10, -10], rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="mb-8">
                <div className="text-9xl drop-shadow-2xl filter">✋</div>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-serif font-black mb-6 leading-tight">
                <span className="text-purple-900">Time to Slap Away</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">The Bad Vibes</span>
              </h1>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="space-y-6 mb-8">
                <p className="text-2xl font-serif italic text-purple-700">
                  "I love you even when I want to slap you."
                </p>
                <p className="text-lg text-purple-600/80">
                  Today is all about being playful, silly, and removing all the negativity. Let's slap away the bad vibes and laugh together!
                </p>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(147, 51, 234, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPhase('slap')}
                className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 mx-auto group"
              >
                Start Slapping
                <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight size={20} />
                </motion.div>
              </motion.button>
            </motion.div>
          )}

          {currentPhase === 'slap' && (
            <motion.div
              key="slap"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full flex flex-col items-center gap-8 max-w-2xl"
            >
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-purple-900 mb-2">Vibe Slapper</h2>
                <p className="text-purple-600">Click to slap away the bad vibes!</p>
              </div>

              <motion.div animate={{ rotate: slapCount % 2 === 0 ? 0 : 180 }} transition={{ duration: 0.3 }} className="text-8xl">
                ✋
              </motion.div>

              <div className="w-full grid grid-cols-2 gap-4">
                {badVibes.map((vibe, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.85 }}
                    onClick={handleSlap}
                    className="p-6 rounded-xl bg-white/70 border-2 border-purple-400 hover:border-purple-600 transition-all text-center"
                  >
                    <p className="text-purple-900 font-semibold">{vibe}</p>
                  </motion.button>
                ))}
              </div>

              <p className="text-2xl font-bold text-purple-600">Slapped {slapCount} times! 💪</p>

              {slapCount > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full bg-white/70 backdrop-blur-md border-2 border-purple-200 rounded-xl p-6 space-y-3"
                >
                  <p className="font-semibold text-purple-600 uppercase">😂 Fun Moments Unlocked:</p>
                  {funnyMemes.slice(0, Math.ceil(slapCount / 2)).map((meme, idx) => (
                    <motion.p key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-purple-800">
                      {meme}
                    </motion.p>
                  ))}
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentPhase('finale');
                  triggerConfetti();
                  triggerConfetti();
                }}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-bold shadow-xl hover:shadow-2xl transition-all"
              >
                Done Slapping! 🎉
              </motion.button>
            </motion.div>
          )}

          {currentPhase === 'finale' && (
            <motion.div
              key="finale"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-2xl"
            >
              <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 3, -3, 0] }} transition={{ duration: 1, repeat: Infinity }} className="text-9xl mb-8">
                😂
              </motion.div>

              <h2 className="text-5xl md:text-6xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-6">
                All Vibes Cleared!
              </h2>

              <p className="text-xl text-purple-700 mb-8">
                We slapped away {slapCount} times worth of negativity. Now it's time to just laugh, be silly, and enjoy being together. That's what love is all about! 💜
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-semibold hover:shadow-lg transition-all"
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
