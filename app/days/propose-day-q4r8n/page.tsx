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
      {[...Array(25)].map((_, i) => (
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
          💍
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

export default function ProposeDayPage() {
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'ring' | 'finale'>('intro');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [ringColor, setRingColor] = useState('gold');
  const { completeDay } = useProgress();
  const [celebrated, setCelebrated] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    if (currentPhase === 'finale' && !celebrated) {
      try { completeDay(2, { response: 'Propose Day celebrated' }); } catch {}
      celebrateDay(2).then(() => { setCelebrated(true); setSaveToast(true); }).catch(() => { setCelebrated(true); setSaveToast(true); });
    }
  }, [currentPhase, celebrated, completeDay]);

  const triggerConfetti = () => {
    const count = 150;
    const defaults = {
      origin: { y: 0.6 },
      spread: 120,
      colors: ['#FFD700', '#C0C0C0', '#FF69B4', '#FFE4E1', '#DC143C'],
    };

    confetti({
      ...defaults,
      particleCount: count,
    });

    confetti({
      ...defaults,
      particleCount: count,
      // Delay is handled in the loop instead
    });
  };

  const colors = [
    { name: 'gold', hex: '#FFD700', label: 'Gold' },
    { name: 'silver', hex: '#C0C0C0', label: 'Silver' },
    { name: 'rose-gold', hex: '#B76E79', label: 'Rose Gold' },
    { name: 'diamond', hex: '#E8F4F8', label: 'Diamond' },
  ];

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 text-rose-900 relative overflow-hidden">
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
            <p className="text-xs uppercase tracking-[0.3em] text-purple-400 font-black">Day 2 - Premium Experience</p>
            <p className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
              💍 Propose Day Special
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
              <motion.div animate={{ y: [-15, 15, -15], rotate: [0, 5, -5, 0] }} transition={{ duration: 5, repeat: Infinity }} className="mb-8">
                <div className="text-9xl drop-shadow-2xl filter">💍</div>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-serif font-black mb-6 leading-tight">
                <span className="text-purple-900">A Question From My</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500">Heart</span>
              </h1>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="space-y-6 mb-8">
                <p className="text-2xl font-serif italic text-purple-700">
                  "I would rather spend one lifetime with you, than face all the ages of this world alone."
                </p>
                <p className="text-lg text-purple-600/80">
                  Paro, every moment with you feels like the greatest proposal I could ever receive. Today, I want to ask you something that my heart has been screaming since the day we met.
                </p>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(147, 51, 234, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPhase('ring')}
                className="px-10 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 mx-auto group"
              >
                Customize Our Ring
                <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight size={20} />
                </motion.div>
              </motion.button>
            </motion.div>
          )}

          {currentPhase === 'ring' && (
            <motion.div
              key="ring"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-full flex flex-col items-center gap-12 max-w-2xl"
            >
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-purple-900 mb-4">Design Your Ring</h2>
                <p className="text-purple-600">Choose the metal that represents your style</p>
              </div>

              {/* Ring Preview */}
              <motion.div
                animate={{ y: [-10, 10, -10], rotate: [0, 2, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-9xl drop-shadow-2xl filter"
              >
                💍
              </motion.div>

              {/* Color Selection */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                {colors.map((color) => (
                  <motion.button
                    key={color.name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setRingColor(color.name);
                      triggerConfetti();
                    }}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      ringColor === color.name
                        ? 'border-purple-600 bg-purple-50 shadow-lg'
                        : 'border-purple-200 hover:border-purple-400'
                    }`}
                  >
                    <div
                      className="w-12 h-12 rounded-full mx-auto mb-2 shadow-lg"
                      style={{ backgroundColor: color.hex }}
                    />
                    <p className="text-sm font-semibold text-purple-900">{color.label}</p>
                  </motion.button>
                ))}
              </div>

              {/* Promise Section */}
              <div className="w-full bg-white/70 backdrop-blur-md border-2 border-purple-200 rounded-2xl p-8 space-y-6">
                <h3 className="text-2xl font-serif font-bold text-purple-900">My Promise to You</h3>
                <div className="space-y-4 text-purple-700">
                  <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                    ✨ I promise to be your biggest cheerleader and your safe harbor when the world gets too loud.
                  </motion.p>
                  <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                    ✨ I promise to choose you, every single day, even when things get complicated.
                  </motion.p>
                  <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                    ✨ I promise to make you smile when you've forgotten how, and to hold your hand through every adventure.
                  </motion.p>
                  <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                    ✨ I promise that my love for you will grow deeper with every sunrise we share.
                  </motion.p>
                </div>
              </div>

              <div className="flex gap-4 flex-wrap justify-center w-full">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentPhase('finale');
                    triggerConfetti();
                    triggerConfetti();
                    triggerConfetti();
                  }}
                  className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-bold shadow-xl hover:shadow-2xl transition-all"
                >
                  Yes, I Will 💜
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPhase('intro')}
                  className="px-10 py-4 bg-white border-2 border-purple-600 text-purple-600 rounded-full font-bold hover:bg-purple-50 transition-all"
                >
                  Go Back
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
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-9xl mb-8"
              >
                💜
              </motion.div>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-6xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-4"
              >
                You Said Yes!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-purple-700 mb-8"
              >
                I knew you would. Because the greatest proposal I could ever make already has the most perfect answer in you.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="p-8 bg-white/80 backdrop-blur-md border-2 border-purple-200 rounded-2xl space-y-4"
              >
                <p className="text-sm uppercase tracking-widest text-purple-400 font-bold">Our Next Chapter Awaits</p>
                <p className="text-lg text-purple-700 leading-relaxed">
                  Thank you for saying yes to this journey. Thank you for choosing us, every single day. The best is yet to come, Paro. 💜
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-10"
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
        <SaveToast visible={saveToast} message="Saved to your memories" onClose={() => setSaveToast(false)} />
      </div>
    </main>
  );
}
