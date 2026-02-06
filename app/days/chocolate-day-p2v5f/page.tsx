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
          🍫
        </motion.div>
      ))}
    </div>
  );
};

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {[
        { delay: 0, size: 400, color: 'from-amber-400/20' },
        { delay: 0.5, size: 300, color: 'from-orange-400/20' },
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

const chocolates = [
  { id: 1, emoji: '🍫', flavor: 'Dark Chocolate', memory: 'Remember when you caught me stealing your chocolate from the fridge?' },
  { id: 2, emoji: '🍬', flavor: 'Milk Chocolate', memory: 'Every sweet moment with you tastes like caramel and vanilla.' },
  { id: 3, emoji: '🍮', flavor: 'Silky Caramel', memory: 'Your smile is sweeter than any chocolate I could ever have.' },
  { id: 4, emoji: '🍦', flavor: 'Chocolate Truffle', memory: 'You are the extra sweetness in my everyday life.' },
  { id: 5, emoji: '🍭', flavor: 'Hazelnut Delight', memory: 'With you, even simple moments become sweet memories.' },
  { id: 6, emoji: '🍩', flavor: 'Chocolate Dream', memory: 'Life is sweeter with you in it, always.' },
];

export default function ChocolateDayPage() {
  const [selectedChocolates, setSelectedChocolates] = useState<number[]>([]);
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'select' | 'finale'>('intro');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const { completeDay } = useProgress();
  const [celebrated, setCelebrated] = useState(false);
  const [saveToast, setSaveToast] = useState(false);
  useEffect(() => {
    if (currentPhase === 'finale' && !celebrated) {
      try { completeDay(3, { response: 'Chocolate Day celebrated' }); } catch {}
      celebrateDay(3).then(() => { setCelebrated(true); setSaveToast(true); }).catch(() => { setCelebrated(true); setSaveToast(true); });
    }
  }, [currentPhase, celebrated, completeDay]);

  const triggerConfetti = () => {
    const count = 100;
    confetti({
      origin: { y: 0.6 },
      spread: 100,
      colors: ['#8B4513', '#D2691E', '#FFD700', '#FFE4B5'],
      particleCount: count,
    });
  };

  const selectChocolate = (id: number) => {
    if (!selectedChocolates.includes(id)) {
      setSelectedChocolates([...selectedChocolates, id]);
      triggerConfetti();
    }
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 text-amber-900 relative overflow-hidden">
      <AnimatedBackground />
      <ParticleField />

      <header className="sticky top-0 z-40 bg-gradient-to-r from-white/80 via-amber-50/50 to-white/80 backdrop-blur-xl border-b border-amber-200/50 px-4 py-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-all"
          >
            <motion.div whileHover={{ x: -4 }}>
              ←
            </motion.div>
            <span className="group-hover:underline">Back to Journey</span>
          </Link>
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400 font-black">Day 3 - Premium Experience</p>
            <p className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
              🍫 Chocolate Day Special
            </p>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMusicPlaying(!isMusicPlaying)}
            className="p-3 rounded-full bg-gradient-to-r from-amber-600 to-orange-500 text-white shadow-lg hover:shadow-xl"
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
              <motion.div animate={{ y: [-10, 10, -10], rotate: [0, 3, -3, 0] }} transition={{ duration: 4, repeat: Infinity }} className="mb-8">
                <div className="text-9xl drop-shadow-2xl filter">🍫</div>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-serif font-black mb-6 leading-tight">
                <span className="text-amber-900">For My Sweet</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-500">Paro</span>
              </h1>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="space-y-6 mb-8">
                <p className="text-2xl font-serif italic text-amber-700">
                  "All you need is love. But a little chocolate now and then doesn't hurt."
                </p>
                <p className="text-lg text-amber-600/80">
                  Like a perfect piece of chocolate, you're smooth, sweet, and absolutely irresistible. Today, let me share some sweet memories with you.
                </p>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(180, 83, 9, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPhase('select')}
                className="px-10 py-4 bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-500 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 mx-auto group"
              >
                Pick a Chocolate
                <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight size={20} />
                </motion.div>
              </motion.button>
            </motion.div>
          )}

          {currentPhase === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full flex flex-col items-center gap-12 max-w-4xl"
            >
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-900 mb-2">Sweet Memory Box</h2>
                <p className="text-amber-600">Click on each chocolate to reveal a sweet memory</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
                {chocolates.map((chocolate) => (
                  <motion.button
                    key={chocolate.id}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => selectChocolate(chocolate.id)}
                    className={`relative p-8 rounded-2xl transition-all ${
                      selectedChocolates.includes(chocolate.id)
                        ? 'bg-white/90 border-2 border-amber-600 shadow-xl'
                        : 'bg-white/70 border-2 border-amber-200 hover:border-amber-400'
                    }`}
                  >
                    <div className="text-6xl mb-3">{chocolate.emoji}</div>
                    {selectedChocolates.includes(chocolate.id) ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-amber-700 leading-relaxed font-serif italic"
                      >
                        {chocolate.memory}
                      </motion.div>
                    ) : (
                      <p className="text-sm font-semibold text-amber-600">{chocolate.flavor}</p>
                    )}
                  </motion.button>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: selectedChocolates.length > 0 ? 1 : 0 }}
                className="text-center"
              >
                <p className="text-amber-600 font-semibold mb-6">
                  {selectedChocolates.length} / {chocolates.length} memories revealed
                </p>
                {selectedChocolates.length === chocolates.length && (
                  <motion.button
                    whileHover={{ scale: 1.08, boxShadow: '0 20px 40px rgba(180, 83, 9, 0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentPhase('finale');
                      triggerConfetti();
                      triggerConfetti();
                    }}
                    className="px-10 py-4 bg-gradient-to-r from-amber-600 to-orange-500 text-white rounded-full font-bold shadow-xl hover:shadow-2xl transition-all"
                  >
                    See Your Sweet Summary 💝
                  </motion.button>
                )}
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
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }} className="text-9xl mb-8">
                💛
              </motion.div>

              <h2 className="text-5xl md:text-6xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500 mb-6">
                You're My Sweetest Treat
              </h2>

              <p className="text-xl text-amber-700 mb-8">
                Every memory I've shared is a piece of the sweetness I feel when I'm with you. Thank you for being the chocolate in my life.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-500 text-white rounded-full font-semibold hover:shadow-lg transition-all"
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
