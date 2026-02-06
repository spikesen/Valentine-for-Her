'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDayGate } from '@/hooks/useDayGate';
import { useProgress } from '@/hooks/useProgress';
import { celebrateDay } from '@/hooks/useCelebrate';
import confetti from 'canvas-confetti';

const ParticleField = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(30)].map((_, i) => (
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
          💝
        </motion.div>
      ))}
    </div>
  );
};

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {[
        { delay: 0, size: 500, color: 'from-red-400/30' },
        { delay: 0.5, size: 400, color: 'from-pink-400/30' },
        { delay: 1, size: 450, color: 'from-rose-400/30' },
      ].map((orb, i) => (
        <motion.div
          key={i}
          animate={{ rotate: 360 }}
          transition={{
            duration: (i + 1) * 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className={`absolute bg-gradient-to-r ${orb.color} to-transparent rounded-full blur-3xl`}
          style={{
            width: orb.size,
            height: orb.size,
            top: `${15 + i * 25}%`,
            left: `${5 + i * 30}%`,
          }}
        />
      ))}
    </div>
  );
};

const memories = [
  '💑 Our first moment together',
  '😂 All the laughs we have shared',
  '🌙 Late night conversations',
  '🌸 Your beautiful smile',
  '🤝 How you support me',
  '💪 Your strength inspires me',
  '🎵 Our song playing together',
  '🏠 Building a home with you',
];

export default function ValentinesDayPage() {
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'timeline' | 'finale'>('intro');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [revealedMemories, setRevealedMemories] = useState(0);
  const { completeDay } = useProgress();
  const [celebrated, setCelebrated] = useState(false);

  useEffect(() => {
    if (currentPhase === 'finale' && !celebrated) {
      // update local progress
      try {
        completeDay(8, { response: "Celebrated Valentine's Day finale" });
      } catch (e) {
        // swallow - local update best-effort
        console.error('local completeDay error', e);
      }

      // send to server
      celebrateDay(8).then(() => setCelebrated(true)).catch(() => setCelebrated(true));
    }
  }, [currentPhase, celebrated, completeDay]);

  const triggerMassConfetti = () => {
    const count = 300;
    const defaults = {
      origin: { y: 0.5 },
      spread: 180,
      colors: ['#DC143C', '#FF1493', '#FFD700', '#FFE4E1', '#FF69B4'],
    };

    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        confetti({
          ...defaults,
          particleCount: count,
        });
      }, i * 150);
    }
  };

  const revealMemory = () => {
    if (revealedMemories < memories.length) {
      setRevealedMemories(revealedMemories + 1);
      confetti({
        origin: { y: 0.6 },
        spread: 100,
        colors: ['#DC143C', '#FF1493', '#FFD700'],
        particleCount: 80,
      });
    }
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 text-red-900 relative overflow-hidden">
      <AnimatedBackground />
      <ParticleField />

      <header className="sticky top-0 z-40 bg-gradient-to-r from-white/80 via-red-50/50 to-white/80 backdrop-blur-xl border-b-2 border-red-400/50 px-4 py-4 shadow-xl">
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
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-center">
            <p className="text-xs uppercase tracking-[0.5em] text-red-400 font-black">Day 8 - GRAND FINALE</p>
            <p className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-pink-500 to-rose-500">
              💝 Valentine's Day
            </p>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsMusicPlaying(!isMusicPlaying);
              if (!isMusicPlaying) triggerMassConfetti();
            }}
            className="p-3 rounded-full bg-gradient-to-r from-red-600 via-pink-500 to-rose-500 text-white shadow-lg hover:shadow-xl"
          >
            {isMusicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </motion.button>
        </div>
      </header>

      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-12 gap-12">
        <AnimatePresence mode="wait">
          {currentPhase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-3xl"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-8"
              >
                <div className="text-9xl drop-shadow-2xl filter">💝</div>
              </motion.div>

              <h1 className="text-6xl md:text-8xl font-serif font-black mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-pink-500 to-rose-500">
                  Happy Valentine's Day
                </span>
              </h1>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="space-y-6 mb-10">
                <p className="text-2xl md:text-3xl font-serif italic text-red-700">
                  "In all the world, there is no heart for me like yours."
                </p>
                <p className="text-lg md:text-xl text-red-600/80 leading-relaxed">
                  My love, these past 14 days have been a small reflection of the infinite love I feel for you every single moment. You are my heart, my soul, and my greatest blessing. Today, I celebrate you—the most beautiful part of my life.
                </p>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.08, boxShadow: '0 30px 60px rgba(220, 20, 60, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentPhase('timeline');
                  triggerMassConfetti();
                }}
                className="px-12 py-6 bg-gradient-to-r from-red-600 via-pink-500 to-rose-500 text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-3xl transition-all flex items-center gap-3 mx-auto group"
              >
                Begin Our Love Story
                <motion.div animate={{ x: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight size={24} />
                </motion.div>
              </motion.button>
            </motion.div>
          )}

          {currentPhase === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full flex flex-col items-center gap-12 max-w-3xl"
            >
              <div className="text-center">
                <h2 className="text-5xl md:text-6xl font-serif font-bold text-red-900 mb-4">Our Love Timeline</h2>
                <p className="text-lg text-red-600">Memories that make us "us"</p>
              </div>

              <motion.div animate={{ y: [-15, 15, -15] }} transition={{ duration: 5, repeat: Infinity }} className="text-8xl">
                💑
              </motion.div>

              <div className="w-full space-y-4">
                {memories.map((memory, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: idx < revealedMemories ? 1 : 0.3, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                      idx < revealedMemories
                        ? 'bg-white/80 border-red-400 shadow-lg'
                        : 'bg-white/50 border-red-200 hover:border-red-300'
                    }`}
                    onClick={() => idx === revealedMemories && revealMemory()}
                  >
                    <p className="text-lg font-serif text-red-800">{memory}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div className="text-center">
                <p className="text-red-600 font-semibold mb-6">
                  {revealedMemories} / {memories.length} memories unlocked
                </p>
                {revealedMemories < memories.length ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={revealMemory}
                    className="px-8 py-4 bg-gradient-to-r from-red-600 to-pink-500 text-white rounded-full font-bold shadow-xl hover:shadow-2xl transition-all"
                  >
                    Reveal Next Memory
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentPhase('finale');
                      triggerMassConfetti();
                    }}
                    className="px-8 py-4 bg-gradient-to-r from-red-600 via-pink-500 to-rose-500 text-white rounded-full font-bold shadow-xl hover:shadow-2xl transition-all"
                  >
                    See My Final Words 💌
                  </motion.button>
                )}
              </motion.div>
            </motion.div>
          )}

          {currentPhase === 'finale' && (
            <motion.div
              key="finale"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl space-y-8"
            >
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-9xl"
              >
                💕
              </motion.div>

              <div className="space-y-6">
                <h2 className="text-6xl md:text-7xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-pink-500 to-rose-500">
                  I Love You
                </h2>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="p-10 bg-white/80 backdrop-blur-md border-3 border-red-400 rounded-3xl space-y-6"
                >
                  <p className="text-xl md:text-2xl text-red-800 font-serif leading-relaxed italic">
                    "Happy Valentine's Day, my everything. These past 14 days have been a small reflection of the love I feel for you every day. You are my heart, my soul, and my greatest blessing. I love you more than words can ever express."
                  </p>

                  <div className="flex justify-center gap-4 text-4xl">
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ delay: 0, duration: 2, repeat: Infinity }}>
                      💕
                    </motion.div>
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ delay: 0.2, duration: 2, repeat: Infinity }}>
                      💖
                    </motion.div>
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ delay: 0.4, duration: 2, repeat: Infinity }}>
                      💗
                    </motion.div>
                  </div>
                </motion.div>

                <p className="text-2xl text-red-700 font-serif">
                  Thank you for being my Valentine, today and always. 💝
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="pt-8"
              >
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-red-600 via-pink-500 to-rose-500 text-white rounded-full font-semibold text-lg hover:shadow-xl transition-all"
                >
                  Our Journey Continues...
                  <ArrowRight size={22} />
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

// Track celebration when final phase is reached (client-side)
// Note: we call this outside render to avoid duplicate hooks when server-rendering
// but ensure it's executed in the client component via useEffect above.
