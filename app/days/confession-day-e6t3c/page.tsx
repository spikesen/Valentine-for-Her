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

const confessions = [
  "I fall in love with you a little more every time you laugh.",
  "Your strength inspires me to be better every single day.",
  "I think about you at the most random moments and smile.",
  "You make every ordinary moment feel special.",
  "I love how you care about the people you love.",
];

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
        🗣️
      </motion.div>
    ))}
  </div>
);

const AnimatedBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    {[
      { delay: 0, size: 400, color: 'from-indigo-400/20' },
      { delay: 0.5, size: 300, color: 'from-purple-400/20' },
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

export default function ConfessionDayPage() {
  const [confessionIdx, setConfessionIdx] = useState(0);
  const [userConfession, setUserConfession] = useState('');
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'confess' | 'finale'>('intro');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const { completeDay } = useProgress();
  const [celebrated, setCelebrated] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    if (currentPhase === 'finale' && !celebrated) {
      try { completeDay(13, { response: 'Confession Day celebrated' }); } catch {}
      celebrateDay(13).then(() => { setCelebrated(true); setSaveToast(true); }).catch(() => { setCelebrated(true); setSaveToast(true); });
    }
  }, [currentPhase, celebrated, completeDay]);

  const triggerConfetti = () => {
    confetti({ origin: { y: 0.6 }, spread: 100, colors: ['#6366F1', '#8B5CF6', '#D8B4FE'], particleCount: 100 });
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-violet-50 text-indigo-900 relative overflow-hidden">
      <AnimatedBackground />
      <ParticleField />

      <header className="sticky top-0 z-40 bg-gradient-to-r from-white/80 via-indigo-50/50 to-white/80 backdrop-blur-xl border-b border-indigo-200/50 px-4 py-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-all">
            <motion.div whileHover={{ x: -4 }}>←</motion.div>
            <span className="group-hover:underline">Back</span>
          </Link>
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-indigo-400 font-black">Day 13 - Truth</p>
            <p className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">🗣️ Confession Day</p>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsMusicPlaying(!isMusicPlaying)}
            className="p-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-500 text-white shadow-lg"
          >
            {isMusicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </motion.button>
        </div>
      </header>

      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-12 gap-12 min-h-[calc(100vh-80px)]">
        <AnimatePresence mode="wait">
          {currentPhase === 'intro' && (
            <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl">
              <motion.div animate={{ y: [-10, 10, -10], rotate: [0, 3, -3, 0] }} className="mb-8 text-9xl">🗣️</motion.div>
              <h1 className="text-5xl md:text-7xl font-serif font-black mb-6">Secrets Shared In Moonlight</h1>
              <p className="text-lg text-indigo-600 mb-8">Let me share things I've never told anyone before, and hear your truths too.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setCurrentPhase('confess');
                  triggerConfetti();
                }}
                className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-500 text-white rounded-full font-bold text-lg shadow-xl inline-flex items-center gap-3"
              >
                Listen To My Confessions
                <ArrowRight size={20} />
              </motion.button>
            </motion.div>
          )}

          {currentPhase === 'confess' && (
            <motion.div key="confess" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center gap-8 max-w-2xl">
              <h2 className="text-4xl font-serif font-bold text-indigo-900">My Confessions</h2>
              <motion.div animate={{ scale: [1, 1.05, 1] }} className="text-8xl">💜</motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={confessionIdx}
                className="w-full p-8 bg-white/80 backdrop-blur-md border-3 border-indigo-400 rounded-2xl"
              >
                <p className="text-xl font-serif italic text-indigo-800">{confessions[confessionIdx]}</p>
              </motion.div>
              <div className="flex gap-3 text-2xl">
                {confessions.map((_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setConfessionIdx(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${idx === confessionIdx ? 'bg-indigo-600 w-8' : 'bg-indigo-300'}`}
                  />
                ))}
              </div>
              <motion.textarea
                value={userConfession}
                onChange={(e) => setUserConfession(e.target.value)}
                placeholder="Share your confession or secret with me..."
                className="w-full p-4 rounded-lg border-2 border-indigo-200 focus:border-indigo-600 focus:outline-none text-indigo-900 placeholder-indigo-400 min-h-32 resize-none"
                whileFocus={{ boxShadow: '0 0 20px rgba(79, 70, 229, 0.2)' }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setCurrentPhase('finale');
                  triggerConfetti();
                  triggerConfetti();
                }}
                className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-500 text-white rounded-full font-bold shadow-xl"
              >
                Share My Truth 💌
              </motion.button>
            </motion.div>
          )}

          {currentPhase === 'finale' && (
            <motion.div key="finale" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl">
              <motion.div animate={{ scale: [1, 1.1, 1] }} className="text-9xl mb-8">💜</motion.div>
              <h2 className="text-5xl font-serif font-black text-indigo-900 mb-6">Thank You For Your Truth</h2>
              <p className="text-xl text-indigo-700 mb-8">
                In this world of masks and filters, I cherish how real you are with me. These confessions are the deepest parts of my heart, shared only with you.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-500 text-white rounded-full font-semibold hover:shadow-lg"
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
