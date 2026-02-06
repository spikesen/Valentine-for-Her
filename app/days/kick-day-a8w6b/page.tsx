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

const ParticleField = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, opacity: 0 }}
        animate={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, opacity: [0, 1, 0] }}
        transition={{ duration: Math.random() * 4 + 8, repeat: Infinity, delay: i * 0.1 }}
        className="absolute text-2xl"
      >
        🦶
      </motion.div>
    ))}
  </div>
);

const AnimatedBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    {[
      { delay: 0, size: 400, color: 'from-green-400/20' },
      { delay: 0.5, size: 300, color: 'from-emerald-400/20' },
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

export default function KickDayPage() {
  const [kickCount, setKickCount] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'kick' | 'finale'>('intro');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const { completeDay } = useProgress();
  const [celebrated, setCelebrated] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    if (currentPhase === 'finale' && !celebrated) {
      try { completeDay(10, { response: 'Kick Day celebrated' }); } catch {}
      celebrateDay(10).then(() => { setCelebrated(true); setSaveToast(true); }).catch(() => { setCelebrated(true); setSaveToast(true); });
    }
  }, [currentPhase, celebrated, completeDay]);

  const triggerConfetti = () => {
    confetti({ origin: { y: 0.6 }, spread: 100, colors: ['#10B981', '#34D399', '#6EE7B7', '#A7F3D0'], particleCount: 100 });
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 text-green-900 relative overflow-hidden">
      <AnimatedBackground />
      <ParticleField />

      <header className="sticky top-0 z-40 bg-gradient-to-r from-white/80 via-green-50/50 to-white/80 backdrop-blur-xl border-b border-green-200/50 px-4 py-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-all">
            <motion.div whileHover={{ x: -4 }}>←</motion.div>
            <span className="group-hover:underline">Back</span>
          </Link>
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-green-400 font-black">Day 10 - Fun Times</p>
            <p className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">🦶 Kick Day</p>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsMusicPlaying(!isMusicPlaying)}
            className="p-3 rounded-full bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-lg"
          >
            {isMusicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </motion.button>
        </div>
      </header>

      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-12 gap-12 min-h-[calc(100vh-80px)]">
        <AnimatePresence mode="wait">
          {currentPhase === 'intro' && (
            <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl">
              <motion.div animate={{ y: [-10, 10, -10], rotate: [0, 15, -15, 0] }} transition={{ duration: 3, repeat: Infinity }} className="mb-8 text-9xl">
                🦶
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-serif font-black mb-6">Kick Away The Stress</h1>
              <p className="text-lg text-green-600 mb-8">Let's be energetic, silly, and powerful together!</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setCurrentPhase('kick');
                  triggerConfetti();
                }}
                className="px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-3"
              >
                Start Kicking
                <ArrowRight size={20} />
              </motion.button>
            </motion.div>
          )}

          {currentPhase === 'kick' && (
            <motion.div key="kick" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center gap-8 max-w-2xl">
              <h2 className="text-4xl font-serif font-bold text-green-900">Pillow Fight Game</h2>
              <motion.div animate={{ rotate: kickCount % 2 === 0 ? 0 : 360 }} className="text-8xl">🦶</motion.div>
              <div className="w-full h-12 bg-white/70 border-3 border-green-400 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${Math.min(kickCount * 2, 100)}%` }}
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-end pr-4"
                >
                  {kickCount > 0 && <span className="text-white font-bold">💪</span>}
                </motion.div>
              </div>
              <p className="text-2xl font-bold text-green-600">{kickCount} Kicks!</p>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setKickCount(kickCount + 1);
                  triggerConfetti();
                  if (kickCount + 1 >= 30) setCurrentPhase('finale');
                }}
                className="w-full py-6 px-8 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-full font-bold text-lg shadow-xl active:scale-95"
              >
                🦶 KICK!
              </motion.button>
            </motion.div>
          )}

          {currentPhase === 'finale' && (
            <motion.div key="finale" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl">
              <motion.div animate={{ scale: [1, 1.1, 1] }} className="text-9xl mb-8">💚</motion.div>
              <h2 className="text-5xl font-serif font-black text-green-600 mb-6">You're Powerful!</h2>
              <p className="text-xl text-green-700 mb-8">All that energy and determination - you inspire me every day!</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-full font-semibold hover:shadow-lg transition-all"
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
