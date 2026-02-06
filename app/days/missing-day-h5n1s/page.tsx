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
        🥺
      </motion.div>
    ))}
  </div>
);

const AnimatedBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    {[
      { delay: 0, size: 400, color: 'from-cyan-400/20' },
      { delay: 0.5, size: 300, color: 'from-blue-400/20' },
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

export default function MissingDayPage() {
  const [heartbeats, setHeartbeats] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'count' | 'finale'>('intro');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const { completeDay } = useProgress();
  const [celebrated, setCelebrated] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    if (currentPhase === 'finale' && !celebrated) {
      try { completeDay(14, { response: 'Missing Day celebrated' }); } catch {}
      celebrateDay(14).then(() => { setCelebrated(true); setSaveToast(true); }).catch(() => { setCelebrated(true); setSaveToast(true); });
    }
  }, [currentPhase, celebrated, completeDay]);

  useEffect(() => {
    if (currentPhase === 'count') {
      const interval = setInterval(() => {
        setHeartbeats((prev) => prev + 1);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [currentPhase]);

  const triggerConfetti = () => {
    confetti({ origin: { y: 0.6 }, spread: 100, colors: ['#06B6D4', '#0EA5E9', '#3B82F6', '#60A5FA'], particleCount: 100 });
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 text-cyan-900 relative overflow-hidden">
      <AnimatedBackground />
      <ParticleField />

      <header className="sticky top-0 z-40 bg-gradient-to-r from-white/80 via-cyan-50/50 to-white/80 backdrop-blur-xl border-b border-cyan-200/50 px-4 py-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-medium transition-all">
            <motion.div whileHover={{ x: -4 }}>←</motion.div>
            <span className="group-hover:underline">Back</span>
          </Link>
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-400 font-black">Day 14 - Final Day</p>
            <p className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-500">🥺 Missing Day</p>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsMusicPlaying(!isMusicPlaying)}
            className="p-3 rounded-full bg-gradient-to-r from-cyan-600 to-blue-500 text-white shadow-lg"
          >
            {isMusicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </motion.button>
        </div>
      </header>

      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-12 gap-12 min-h-[calc(100vh-80px)]">
        <AnimatePresence mode="wait">
          {currentPhase === 'intro' && (
            <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl">
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="mb-8 text-9xl">
                🥺
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-serif font-black mb-6">
                <span className="text-cyan-900">Counting The Moments</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-500">Until I See You</span>
              </h1>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="space-y-6 mb-8">
                <p className="text-2xl font-serif italic text-cyan-700">
                  "In case you ever foolishly forget: I am never not thinking of you."
                </p>
                <p className="text-lg text-cyan-600/80">
                  Even when we're apart for just an hour, I miss you. This journey might be ending, but our story is just beginning. I'm already counting down the seconds until I see you again.
                </p>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setCurrentPhase('count');
                  triggerConfetti();
                }}
                className="px-10 py-4 bg-gradient-to-r from-cyan-600 to-blue-500 text-white rounded-full font-bold text-lg shadow-xl inline-flex items-center gap-3"
              >
                Count Our Heartbeats
                <ArrowRight size={20} />
              </motion.button>
            </motion.div>
          )}

          {currentPhase === 'count' && (
            <motion.div key="count" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center gap-8 max-w-2xl">
              <h2 className="text-4xl font-serif font-bold text-cyan-900">Our Heartbeats</h2>
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-9xl"
              >
                💙
              </motion.div>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="w-full p-12 bg-white/80 backdrop-blur-md border-3 border-cyan-400 rounded-2xl text-center"
              >
                <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-500">{heartbeats}</p>
                <p className="text-cyan-600 font-semibold mt-4">heartbeats shared in this journey</p>
              </motion.div>

              <motion.div className="w-full space-y-4 p-6 bg-white/70 border-2 border-cyan-200 rounded-xl">
                <p className="text-cyan-600 font-semibold uppercase">Did You Know?</p>
                <p className="text-cyan-800 text-lg leading-relaxed">
                  "Your heart beats approximately 100,000 times per day. That means I think of you about 100,000 times a day. That's how much space you take up in my heart."
                </p>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setCurrentPhase('finale');
                  triggerConfetti();
                  triggerConfetti();
                  triggerConfetti();
                }}
                className="w-full px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-500 text-white rounded-full font-bold shadow-xl"
              >
                See You Soon 💙
              </motion.button>
            </motion.div>
          )}

          {currentPhase === 'finale' && (
            <motion.div key="finale" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl space-y-8">
              <motion.div animate={{ y: [0, -30, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-9xl">
                💙
              </motion.div>

              <div className="space-y-6">
                <h2 className="text-5xl md:text-6xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-500">
                  The Journey Awaits
                </h2>

                <motion.div className="p-10 bg-white/80 backdrop-blur-md border-3 border-cyan-400 rounded-3xl space-y-6">
                  <p className="text-xl md:text-2xl text-cyan-800 font-serif leading-relaxed italic">
                    These 14 days were just a glimpse of the love I have for you. The real journey—the one where we build a life together, create memories, and grow old hand in hand—that starts now.
                  </p>

                  <p className="text-lg text-cyan-700">
                    I'm not saying goodbye, Paro. I'm saying: I can't wait to see you. I can't wait to hold you. I can't wait for our next chapter.
                  </p>

                  <p className="text-3xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-500">
                    I love you. Now. Always. Forever. 💙
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="pt-8"
              >
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-cyan-600 to-blue-500 text-white rounded-full font-semibold text-lg hover:shadow-xl transition-all"
                >
                  Our Story Continues...
                  <ArrowRight size={22} />
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
