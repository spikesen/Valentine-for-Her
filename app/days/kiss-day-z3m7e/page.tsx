'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { celebrateDay } from '@/hooks/useCelebrate';
import SaveToast from '@/components/SaveToast';
import confetti from 'canvas-confetti';
import { ParticleField } from '@/components/ParticleField';

const ParticleField_Old = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(25)].map((_, i) => (
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
          💋
        </motion.div>
      ))}
    </div>
  );
};

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {[
        { delay: 0, size: 400, color: 'from-red-400/20' },
        { delay: 0.5, size: 300, color: 'from-pink-400/20' },
        { delay: 1, size: 350, color: 'from-rose-400/20' },
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

export default function KissDayPage() {
  const [kissCount, setKissCount] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'kiss' | 'finale'>('intro');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const { completeDay } = useProgress();
  const [celebrated, setCelebrated] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    if (currentPhase === 'finale' && !celebrated) {
      try { completeDay(7, { response: 'Kiss Day celebrated' }); } catch {}
      celebrateDay(7).then(() => { setCelebrated(true); setSaveToast(true); }).catch(() => { setCelebrated(true); setSaveToast(true); });
    }
  }, [currentPhase, celebrated, completeDay]);

  const triggerConfetti = () => {
    confetti({
      origin: { y: 0.6 },
      spread: 100,
      colors: ['#DC143C', '#FF1493', '#FFB6C1', '#FFC0CB'],
      particleCount: 100,
    });
  };

  const handleKiss = () => {
    setKissCount(kissCount + 1);
    triggerConfetti();
    if (kissCount + 1 >= 20) {
      setTimeout(() => setCurrentPhase('finale'), 500);
    }
  };

  const compliments = [
    "Your smile makes my heart skip a beat",
    "Every kiss with you feels like magic",
    "You're my favorite person",
    "Being with you is home",
    "You're my greatest blessing",
    "I love you more every day",
    "You make life beautiful",
  ];

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 text-red-900 relative overflow-hidden">
      <AnimatedBackground />
      <ParticleField />

      <header className="sticky top-0 z-40 bg-gradient-to-r from-white/80 via-red-50/50 to-white/80 backdrop-blur-xl border-b border-red-200/50 px-4 py-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-all"
          >
            <motion.div whileHover={{ x: -4 }}>
              ←
            </motion.div>
            <span className="group-hover:underline">Back to Journey</span>
          </Link>
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-red-400 font-black">Day 7 - Premium Experience</p>
            <p className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-500">
              💋 Kiss Day Special
            </p>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMusicPlaying(!isMusicPlaying)}
            className="p-3 rounded-full bg-gradient-to-r from-red-600 to-pink-500 text-white shadow-lg hover:shadow-xl"
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
              <motion.div animate={{ y: [-10, 10, -10], scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }} className="mb-8">
                <div className="text-9xl drop-shadow-2xl filter">💋</div>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-serif font-black mb-6 leading-tight">
                <span className="text-red-900">A Kiss Is Worth A</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-500">Thousand Words</span>
              </h1>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="space-y-6 mb-8">
                <p className="text-2xl font-serif italic text-red-700">
                  "The soul that can speak through the eyes can also kiss with a gaze."
                </p>
                <p className="text-lg text-red-600/80">
                  Can't wait for the next real one, but until then, let me shower you with virtual kisses and compliments.
                </p>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(220, 20, 60, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPhase('kiss')}
                className="px-10 py-4 bg-gradient-to-r from-red-600 to-pink-500 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 mx-auto group"
              >
                Leave Lipstick Marks
                <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight size={20} />
                </motion.div>
              </motion.button>
            </motion.div>
          )}

          {currentPhase === 'kiss' && (
            <motion.div
              key="kiss"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full flex flex-col items-center gap-8 max-w-2xl"
            >
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-red-900 mb-2">Kiss Counter</h2>
                <p className="text-red-600">Tap to leave your mark</p>
              </div>

              <motion.div
                animate={{ scale: kissCount > 0 ? 1.1 : 1, rotate: [0, 2, -2, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-9xl"
              >
                💋
              </motion.div>

              <div className="w-full h-32 bg-white/70 backdrop-blur-md border-3 border-red-400 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex flex-wrap items-center justify-center p-4 gap-2">
                  {[...Array(kissCount)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 1, opacity: 0.8 }}
                      transition={{ delay: i * 0.05 }}
                      className="text-3xl"
                    >
                      💋
                    </motion.div>
                  ))}
                </div>
              </div>

              <p className="text-center text-red-600 font-semibold text-2xl">{kissCount} Kisses 💕</p>

              <motion.button
                whileHover={{ scale: 1.08, boxShadow: '0 20px 40px rgba(220, 20, 60, 0.4)' }}
                whileTap={{ scale: 0.9 }}
                onClick={handleKiss}
                className="w-full max-w-xs py-6 px-8 bg-gradient-to-r from-red-600 to-pink-500 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all active:scale-95"
              >
                💋 Kiss
              </motion.button>

              {kissCount > 0 && (
                <div className="w-full bg-white/70 backdrop-blur-md border-2 border-red-200 rounded-xl p-4 space-y-3">
                  <p className="text-sm text-red-600 font-semibold uppercase">Compliments Revealed:</p>
                  {compliments.slice(0, Math.ceil(kissCount / 3)).map((compliment, idx) => (
                    <motion.p key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-red-800 font-serif italic">
                      ✨ {compliment}
                    </motion.p>
                  ))}
                </div>
              )}
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
                💕
              </motion.div>

              <h2 className="text-5xl md:text-6xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-500 mb-6">
                All Marked Up With Love
              </h2>

              <p className="text-xl text-red-700 mb-8">
                Every kiss, every compliment - they're all proof of how deeply I love you. Can't wait to give you real kisses soon. 💋
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-pink-500 text-white rounded-full font-semibold hover:shadow-lg transition-all"
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
