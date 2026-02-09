'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { useState, useEffect } from 'react';

import { useProgress } from '@/hooks/useProgress';
import { useDayGate } from '@/hooks/useDayGate';
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
          🤝
        </motion.div>
      ))}
    </div>
  );
};

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {[
        { delay: 0, size: 400, color: 'from-blue-400/20' },
        { delay: 0.5, size: 300, color: 'from-cyan-400/20' },
        { delay: 1, size: 350, color: 'from-indigo-400/20' },
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

const defaultPromises = [
  'To hold you close and never let go',
  'To make you laugh on the hardest days',
  'To choose you, every single day',
  'To be your safe harbor in any storm',
  'To grow old together hand in hand',
  'To love you deeper than yesterday',
];

export default function PromiseDayPage() {
  useDayGate(5);
  const [promises, setPromises] = useState<string[]>([]);
  const [newPromise, setNewPromise] = useState('');
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'jar' | 'finale'>('intro');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const { completeDay } = useProgress();
  const [celebrated, setCelebrated] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    if (currentPhase === 'finale' && !celebrated) {
      try { completeDay(5, { response: 'Promise Day celebrated' }); } catch {}
      celebrateDay(5).then(() => { setCelebrated(true); setSaveToast(true); }).catch(() => { setCelebrated(true); setSaveToast(true); });
    }
  }, [currentPhase, celebrated, completeDay]);

  const triggerConfetti = () => {
    confetti({
      origin: { y: 0.6 },
      spread: 100,
      colors: ['#3B82F6', '#06B6D4', '#4F46E5', '#8B5CF6'],
      particleCount: 100,
    });
  };

  const addPromise = () => {
    if (newPromise.trim()) {
      setPromises([...promises, newPromise]);
      setNewPromise('');
      triggerConfetti();
    }
  };

  const sealJar = () => {
    triggerConfetti();
    triggerConfetti();
    triggerConfetti();
    setCurrentPhase('finale');
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 text-blue-900 relative overflow-hidden">
      <AnimatedBackground />
      <ParticleField />

      <header className="sticky top-0 z-40 bg-gradient-to-r from-white/80 via-blue-50/50 to-white/80 backdrop-blur-xl border-b border-blue-200/50 px-4 py-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-all"
          >
            <motion.div whileHover={{ x: -4 }}>
              ←
            </motion.div>
            <span className="group-hover:underline">Back to Journey</span>
          </Link>
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-blue-400 font-black">Day 5 - Premium Experience</p>
            <p className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              🤝 Promise Day Special
            </p>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMusicPlaying(!isMusicPlaying)}
            className="p-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg hover:shadow-xl"
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
              <motion.div animate={{ y: [-10, 10, -10], rotate: [0, 3, -3, 0] }} transition={{ duration: 4, repeat: Infinity }} className="mb-8">
                <div className="text-9xl drop-shadow-2xl filter">🤝</div>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-serif font-black mb-6 leading-tight">
                <span className="text-blue-900">Promises Sealed in</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Forever</span>
              </h1>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="space-y-6 mb-8">
                <p className="text-2xl font-serif italic text-blue-700">
                  "Promises are the uniquely human way of ordering the future."
                </p>
                <p className="text-lg text-blue-600/80">
                  Let me seal these promises in a digital jar that we can cherish forever. These are my vows to you.
                </p>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPhase('jar')}
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 mx-auto group"
              >
                Open The Promise Jar
                <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight size={20} />
                </motion.div>
              </motion.button>
            </motion.div>
          )}

          {currentPhase === 'jar' && (
            <motion.div
              key="jar"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full flex flex-col items-center gap-8 max-w-2xl"
            >
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-blue-900 mb-2">The Promise Jar</h2>
                <p className="text-blue-600">Sealed with love, forever</p>
              </div>

              <motion.div animate={{ y: [-10, 10, -10], rotate: [0, 2, -2, 0] }} transition={{ duration: 4, repeat: Infinity }} className="text-8xl">
                🫙
              </motion.div>

              <div className="w-full bg-white/70 backdrop-blur-md border-2 border-blue-200 rounded-2xl p-6 space-y-4 max-h-80 overflow-y-auto">
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">My Promises to You:</p>
                {[...defaultPromises, ...promises].map((promise, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg"
                  >
                    <span className="text-blue-600 font-bold">{idx + 1}.</span>
                    <p className="text-blue-800">{promise}</p>
                  </motion.div>
                ))}
              </div>

              <div className="w-full flex flex-col gap-4">
                <div className="flex gap-2">
                  <motion.input
                    type="text"
                    value={newPromise}
                    onChange={(e) => setNewPromise(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addPromise()}
                    placeholder="Add your own promise..."
                    className="flex-1 px-4 py-3 rounded-lg border-2 border-blue-200 focus:border-blue-600 focus:outline-none text-blue-900 placeholder-blue-400 transition-all"
                    whileFocus={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)' }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addPromise}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
                  >
                    Add +
                  </motion.button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sealJar}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-bold shadow-xl hover:shadow-2xl transition-all"
                >
                  Seal The Jar 🔐
                </motion.button>
              </div>
            </motion.div>
          )}

          {currentPhase === 'finale' && (
            <motion.div
              key="finale"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-2xl"
            >
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }} className="text-9xl mb-8">
                💙
              </motion.div>

              <h2 className="text-5xl md:text-6xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-6">
                Promises Sealed
              </h2>

              <p className="text-xl text-blue-700 mb-8">
                Every promise in this jar represents my commitment to you. I will honor each one, every single day of our lives together.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-semibold hover:shadow-lg transition-all"
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
