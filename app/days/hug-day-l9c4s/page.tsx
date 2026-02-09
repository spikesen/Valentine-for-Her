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
          🫂
        </motion.div>
      ))}
    </div>
  );
};

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {[
        { delay: 0, size: 400, color: 'from-orange-400/20' },
        { delay: 0.5, size: 300, color: 'from-red-400/20' },
        { delay: 1, size: 350, color: 'from-yellow-400/20' },
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

export default function HugDayPage() {
  useDayGate(6);
  const [warmthLevel, setWarmthLevel] = useState(0);
  const [isHugging, setIsHugging] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'hug' | 'finale'>('intro');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const triggerConfetti = () => {
    confetti({
      origin: { y: 0.6 },
      spread: 100,
      colors: ['#FF6B6B', '#FFA94D', '#FFD93D', '#6BCB77'],
      particleCount: 120,
    });
  };

  const { completeDay } = useProgress();
  const [celebrated, setCelebrated] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    if (currentPhase === 'finale' && !celebrated) {
      try { completeDay(6, { response: 'Hug Day celebrated' }); } catch {}
      celebrateDay(6).then(() => { setCelebrated(true); setSaveToast(true); }).catch(() => { setCelebrated(true); setSaveToast(true); });
    }
  }, [currentPhase, celebrated, completeDay]);

  const handleHug = () => {
    if (warmthLevel < 100) {
      setIsHugging(true);
      setWarmthLevel(warmthLevel + 10);
      triggerConfetti();
      setTimeout(() => setIsHugging(false), 500);
    } else {
      setCurrentPhase('finale');
      triggerConfetti();
      triggerConfetti();
    }
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 text-orange-900 relative overflow-hidden">
      <AnimatedBackground />
      <ParticleField />

      <header className="sticky top-0 z-40 bg-gradient-to-r from-white/80 via-orange-50/50 to-white/80 backdrop-blur-xl border-b border-orange-200/50 px-4 py-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-all"
          >
            <motion.div whileHover={{ x: -4 }}>
              ←
            </motion.div>
            <span className="group-hover:underline">Back to Journey</span>
          </Link>
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-orange-400 font-black">Day 6 - Premium Experience</p>
            <p className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-500">
              🫂 Hug Day Special
            </p>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMusicPlaying(!isMusicPlaying)}
            className="p-3 rounded-full bg-gradient-to-r from-orange-600 to-red-500 text-white shadow-lg hover:shadow-xl"
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
                <div className="text-9xl drop-shadow-2xl filter">🫂</div>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-serif font-black mb-6 leading-tight">
                <span className="text-orange-900">Wrap Me In Your</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-500">Warmth</span>
              </h1>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="space-y-6 mb-8">
                <p className="text-2xl font-serif italic text-orange-700">
                  "A hug is like a bandage for a hurting mind."
                </p>
                <p className="text-lg text-orange-600/80">
                  There's no place in the world I'd rather be than wrapped in your arms. Let me feel that warmth.
                </p>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(234, 88, 12, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPhase('hug')}
                className="px-10 py-4 bg-gradient-to-r from-orange-600 to-red-500 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 mx-auto group"
              >
                Give Me A Hug
                <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight size={20} />
                </motion.div>
              </motion.button>
            </motion.div>
          )}

          {currentPhase === 'hug' && (
            <motion.div
              key="hug"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full flex flex-col items-center gap-12 max-w-2xl"
            >
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-orange-900 mb-2">Hold The Hug</h2>
                <p className="text-orange-600">Keep holding to fill the warmth meter</p>
              </div>

              <motion.div animate={isHugging ? { scale: 0.9 } : { scale: 1 }} transition={{ duration: 0.2 }} className="text-9xl">
                🫂
              </motion.div>

              <div className="w-full space-y-4">
                <div className="w-full h-12 bg-white/70 border-3 border-orange-400 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: `${warmthLevel}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 flex items-center justify-end pr-4"
                  >
                    {warmthLevel > 0 && (
                      <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: Infinity }} className="text-white font-bold">
                        ❤️
                      </motion.span>
                    )}
                  </motion.div>
                </div>
                <p className="text-center text-orange-600 font-semibold">{warmthLevel}% Warmth</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseDown={() => setIsHugging(true)}
                onMouseUp={() => setIsHugging(false)}
                onTouchStart={() => setIsHugging(true)}
                onTouchEnd={() => setIsHugging(false)}
                onClick={handleHug}
                className="w-full max-w-xs py-6 px-8 bg-gradient-to-r from-orange-600 to-red-500 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all active:scale-95"
              >
                {warmthLevel < 100 ? 'Hold Me Tighter' : 'Certificate Unlocked!'}
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
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }} className="text-9xl mb-8">
                💛
              </motion.div>

              <h2 className="text-5xl md:text-6xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-500 mb-6">
                You're My Warmth
              </h2>

              <motion.div className="p-8 bg-white/80 backdrop-blur-md border-3 border-orange-400 rounded-2xl mb-8">
                <p className="text-xl text-orange-700 leading-relaxed">
                  🏆 Certificate of Warmth 🏆
                </p>
                <p className="text-sm text-orange-600 mt-4">
                  This certifies that Paro has provided 100% pure, genuine warmth and unconditional love hugs. Valid forever and always.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-red-500 text-white rounded-full font-semibold hover:shadow-lg transition-all"
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
