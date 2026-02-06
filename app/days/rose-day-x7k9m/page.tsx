'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Music, Star, Volume2, VolumeX, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { NoteForm } from '@/components/NoteForm';
import { NotesViewer } from '@/components/NotesViewer';

// Particle system for premium feel
const ParticleField = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: -100, x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000) }}
          animate={{
            opacity: [0, 0.5, 0],
            y: typeof window !== 'undefined' ? window.innerHeight : 1000,
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'linear',
          }}
          className="absolute text-3xl"
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
};

// Animated background elements
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-rose-300/20 to-pink-300/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-red-300/20 to-pink-300/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-rose-200/10 to-transparent rounded-full blur-3xl"
      />
    </div>
  );
};

// Premium Rose Component with Enhanced Animation
const PremiumRose = ({ index, isNewRose, onClick }: { index: number; isNewRose: boolean; onClick: () => void }) => {
  const angle = (index / 10) * 360;
  const radius = 140;
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;

  return (
    <motion.div
      initial={isNewRose ? { scale: 0, opacity: 0, rotate: -180, filter: 'blur(10px)' } : { scale: 0, opacity: 0, rotate: -180 }}
      animate={{ scale: 1, opacity: 1, rotate: 0, filter: 'blur(0px)' }}
      transition={
        isNewRose
          ? {
              type: 'spring',
              stiffness: 100,
              damping: 12,
              mass: 1.5,
              delay: 0.1,
            }
          : {
              delay: index * 0.12,
              type: 'spring',
              stiffness: 150,
              damping: 15,
            }
      }
      onClick={onClick}
      className="absolute cursor-pointer group"
      style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
      whileHover={{ scale: 1.35, filter: 'drop-shadow(0 0 30px rgba(220, 20, 60, 0.8))' }}
      whileTap={{ scale: 0.7 }}
    >
      {/* Bloom glow effect for new roses */}
      {isNewRose && (
        <motion.div
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full blur-2xl -z-10"
          style={{ width: '100%', height: '100%' }}
        />
      )}

      {/* Particle burst for new roses */}
      {isNewRose && (
        <>
          {[...Array(8)].map((_, i) => {
            const burstAngle = (i / 8) * 360 * (Math.PI / 180);
            const burstDistance = 60;
            const bx = Math.cos(burstAngle) * burstDistance;
            const by = Math.sin(burstAngle) * burstDistance;

            return (
              <motion.div
                key={`burst-${i}`}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x: bx, y: by, opacity: 0, scale: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0 }}
                className="absolute text-2xl pointer-events-none"
                style={{ left: '-50%', top: '-50%' }}
              >
                ✨
              </motion.div>
            );
          })}
        </>
      )}

      {/* Main rose with enhanced rotation */}
      <motion.div
        animate={{ rotate: 360, y: [0, -10, 0] }}
        transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, y: { duration: 3, repeat: Infinity } }}
        className="text-6xl filter drop-shadow-2xl origin-center"
      >
        🌹
      </motion.div>

      {/* Number badge with enhanced animation */}
      <motion.div
        initial={isNewRose ? { opacity: 0, scale: 0 } : { opacity: 0, scale: 0 }}
        whileHover={isNewRose ? { opacity: 1, scale: 1 } : undefined}
        animate={isNewRose ? { opacity: [0, 1, 0.8] } : undefined}
        transition={isNewRose ? { delay: 0.3, duration: 0.5 } : undefined}
        className="absolute -top-10 -left-8 w-16 h-16 bg-gradient-to-br from-white to-rose-50 backdrop-blur-md rounded-full flex items-center justify-center text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-500 shadow-xl border-2 border-rose-200"
      >
        #{index + 1}
      </motion.div>

      {/* Glow ring effect on hover */}
      <motion.div
        animate={{ scale: 1, opacity: 0 }}
        whileHover={{ scale: 1.8, opacity: 0.3 }}
        className="absolute inset-0 border-2 border-rose-400 rounded-full -z-10 blur-sm"
      />
    </motion.div>
  );
};

// Luxury ribbon design
const LuxuryRibbon = () => {
  return (
    <motion.div
      animate={{ y: [-3, 3, -3] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="relative w-80 h-20"
    >
      <svg viewBox="0 0 300 80" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DC143C" />
            <stop offset="50%" stopColor="#FF69B4" />
            <stop offset="100%" stopColor="#DC143C" />
          </linearGradient>
          <linearGradient id="ribbonGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.3)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>
        </defs>

        {/* Main ribbon shape */}
        <path
          d="M 20 20 L 280 20 Q 290 40 280 60 L 20 60 Q 10 40 20 20 Z"
          fill="url(#ribbonGradient)"
          opacity="0.9"
        />
        <path
          d="M 20 20 L 280 20 Q 290 40 280 60 L 20 60 Q 10 40 20 20 Z"
          fill="url(#ribbonGlow)"
        />

        {/* Bows on sides */}
        <g>
          <ellipse cx="15" cy="40" rx="8" ry="12" fill="#DC143C" opacity="0.8" />
          <ellipse cx="285" cy="40" rx="8" ry="12" fill="#DC143C" opacity="0.8" />
        </g>

        {/* Text */}
        <text x="150" y="48" textAnchor="middle" fontSize="20" fontWeight="bold" fill="white" fontFamily="serif">
          FOR PARO 💕
        </text>
      </svg>

      {/* Sparkle effects */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-2 left-1/4 text-xl"
      >
        ✨
      </motion.div>
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        className="absolute top-2 right-1/4 text-xl"
      >
        ✨
      </motion.div>
    </motion.div>
  );
};

// Premium card component
const PremiumCard = ({ emoji, title, description, delay }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay, type: 'spring', stiffness: 100 }}
      whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(220, 20, 60, 0.2)' }}
      className="group relative bg-gradient-to-br from-white/90 via-pink-50/50 to-rose-50/30 backdrop-blur-xl border border-white/60 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all overflow-hidden"
    >
      {/* Animated gradient overlay */}
      <motion.div
        animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-br from-rose-400/10 via-pink-400/10 to-red-400/10 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ backgroundSize: '200% 200%' }}
      />

      {/* Content */}
      <div className="relative z-10">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay }}
          className="text-5xl mb-3"
        >
          {emoji}
        </motion.div>
        <h3 className="text-lg font-bold text-rose-900 mb-2">{title}</h3>
        <p className="text-sm text-rose-700/80 leading-relaxed">{description}</p>
      </div>

      {/* Border animation */}
      <motion.div
        animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 rounded-2xl p-px bg-gradient-to-r from-rose-400 via-pink-400 to-red-400 opacity-0 group-hover:opacity-100 -z-10"
        style={{ backgroundSize: '200% 200%' }}
      />
    </motion.div>
  );
};

export default function RoseDayPage() {
  const [roseCount, setRoseCount] = useState(0);
  const [showBouquet, setShowBouquet] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'bloom' | 'bouquet' | 'finale'>('intro');
  const [lastAddedRose, setLastAddedRose] = useState<number | null>(null);
  const [showNotesSection, setShowNotesSection] = useState(false);

  const maxRoses = 10;

  const handleRoseGenerate = () => {
    if (roseCount < maxRoses) {
      setLastAddedRose(roseCount);
      setRoseCount(roseCount + 1);
      triggerConfetti();
      // Clear the "new rose" indicator after animation completes
      setTimeout(() => setLastAddedRose(null), 1000);
    }
    if (roseCount + 1 === maxRoses) {
      setTimeout(() => setShowBouquet(true), 500);
    }
  };

  const triggerConfetti = () => {
    const count = 100;
    const defaults = {
      origin: { y: 0.6 },
      spread: 100,
      colors: ['#DC143C', '#FFE4E1', '#FFD700', '#FF69B4'],
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

  const completeBouquet = () => {
    if (roseCount < maxRoses) {
      setRoseCount(maxRoses);
    }
    setShowBouquet(true);
    setCurrentPhase('bouquet');
    triggerConfetti();
    triggerConfetti();
    triggerConfetti();
  };

  useEffect(() => {
    if (roseCount > 0) {
      setCurrentPhase('bloom');
    }
  }, [roseCount]);

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 text-rose-900 relative overflow-hidden">
      {/* Premium Background */}
      <AnimatedBackground />
      <ParticleField />

      {/* Header - Premium */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-white/80 via-pink-50/50 to-white/80 backdrop-blur-xl border-b border-rose-200/50 px-4 py-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-2 text-rose-600 hover:text-rose-700 font-medium transition-all"
          >
            <motion.div whileHover={{ x: -4 }}>
              ←
            </motion.div>
            <span className="group-hover:underline">Back to Journey</span>
          </Link>
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-rose-400 font-black">Day 1 - Premium Experience</p>
            <p className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-500">
              🌹 Rose Day Special
            </p>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMusicPlaying(!isMusicPlaying)}
            className="p-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-500 text-white shadow-lg hover:shadow-xl"
          >
            {isMusicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-12 gap-12">
        {/* Intro Phase */}
        <AnimatePresence mode="wait">
          {currentPhase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-3xl"
            >
              <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity }} className="mb-6">
                <div className="text-8xl drop-shadow-2xl filter">🌹</div>
              </motion.div>

              <h1 className="text-6xl md:text-7xl font-serif font-black mb-6 leading-tight">
                <span className="text-rose-900">For My Beautiful</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-500 to-red-500">Paro</span>
              </h1>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="space-y-4 mb-8">
                <p className="text-2xl font-serif italic text-rose-700">
                  "A single rose can be my garden... a single friend, my world."
                </p>
                <p className="text-lg text-rose-600/80">
                  Every rose you bloom represents a precious moment, a beautiful memory, a reason I cherish you.
                </p>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(220, 20, 60, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPhase('bloom')}
                className="px-10 py-4 bg-gradient-to-r from-rose-600 via-pink-500 to-red-500 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 mx-auto group"
              >
                Begin the Journey
                <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight size={20} />
                </motion.div>
              </motion.button>
            </motion.div>
          )}

          {/* Bloom Phase */}
          {currentPhase === 'bloom' && !showBouquet && (
            <motion.div
              key="bloom"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col items-center gap-12"
            >
              {/* Rose Circle */}
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="relative w-full max-w-lg h-96">
                {/* Center glow */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-1/4 bg-gradient-to-r from-rose-400/40 to-pink-400/40 rounded-full blur-3xl"
                />

                {/* Roses */}
                {Array(roseCount)
                  .fill(0)
                  .map((_, i) => (
                    <PremiumRose
                      key={i}
                      index={i}
                      isNewRose={lastAddedRose === i}
                      onClick={() => {
                        triggerConfetti();
                      }}
                    />
                  ))}

                {/* Center content */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <motion.div className="text-7xl mb-4">💕</motion.div>
                  <p className="text-2xl font-bold text-rose-600">
                    {roseCount}
                    <span className="text-rose-400">/{maxRoses}</span>
                  </p>
                  <p className="text-sm text-rose-500 mt-2 uppercase tracking-wider font-semibold">Roses Bloomed</p>
                </motion.div>
              </motion.div>

              {/* Action buttons */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4 flex-wrap justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRoseGenerate}
                  disabled={roseCount >= maxRoses}
                  className="px-10 py-4 bg-gradient-to-r from-rose-600 to-pink-500 text-white rounded-full font-bold shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  🌹 Bloom a Rose
                </motion.button>
                {roseCount < maxRoses && roseCount > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={completeBouquet}
                    className="px-10 py-4 bg-white border-2 border-rose-600 text-rose-600 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all"
                  >
                    ✨ Complete Bouquet
                  </motion.button>
                )}
              </motion.div>
            </motion.div>
          )}

          {/* Bouquet Phase */}
          {showBouquet && (
            <motion.div
              key="bouquet"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full flex flex-col items-center gap-12"
            >
              {/* Premium Bouquet */}
              <motion.div animate={{ y: [-8, 8, -8] }} transition={{ duration: 4, repeat: Infinity }} className="w-full flex justify-center">
                <div className="relative w-80 h-96">
                  {/* Background glow */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-t from-rose-400/40 to-transparent rounded-full blur-3xl"
                  />

                  {/* SVG Bouquet */}
                  <svg viewBox="0 0 200 400" className="w-full h-full relative z-10 drop-shadow-2xl">
                    {/* Stems */}
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ staggerChildren: 0.1 }}
                    >
                      {[...Array(3)].map((_, i) => (
                        <motion.path
                          key={`stem-${i}`}
                          d={`M ${100 + i * 8 - 8} 150 Q ${100 + i * 8 - 8 + (i - 1) * 5} 220 ${90 + i * 8} 360`}
                          stroke="#2d5016"
                          strokeWidth="4"
                          fill="none"
                          animate={{ pathLength: [0, 1] }}
                          transition={{ duration: 2, delay: i * 0.1 }}
                        />
                      ))}
                    </motion.g>

                    {/* Roses in bouquet */}
                    {[...Array(10)].map((_, i) => {
                      const angle = (i / 10) * 360 * (Math.PI / 180);
                      const radius = 50;
                      const x = 100 + Math.cos(angle) * radius;
                      const y = 100 + Math.sin(angle) * radius;

                      return (
                        <motion.g
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + i * 0.08, type: 'spring', stiffness: 200 }}
                        >
                          <motion.text
                            x={x}
                            y={y}
                            fontSize="28"
                            textAnchor="middle"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20 + i, repeat: Infinity, ease: 'linear' }}
                          >
                            🌹
                          </motion.text>
                        </motion.g>
                      );
                    })}
                  </svg>
                </div>
              </motion.div>

              {/* Ribbon */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
                <LuxuryRibbon />
              </motion.div>

              {/* Message Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="max-w-3xl text-center space-y-6"
              >
                <h2 className="text-5xl font-serif font-bold text-rose-900">Your Perfect Bouquet</h2>
                <p className="text-xl text-rose-700/80 leading-relaxed">
                  Just like these 10 beautiful roses, there are countless reasons why you mean the world to me.
                  Each petal represents a moment, each bloom represents a memory, and together they symbolize
                  the beautiful journey we're creating together.
                </p>
              </motion.div>

              {/* Premium Reasons Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {[
                  { emoji: '💕', title: 'Your Love', description: 'Is my greatest gift and my greatest treasure' },
                  { emoji: '✨', title: 'Your Smile', description: 'Makes even the darkest days shine bright' },
                  { emoji: '🌟', title: 'Your Spirit', description: 'Is my shining star in the night sky' },
                  { emoji: '🦋', title: 'Your Touch', description: 'Sets my heart aflutter every time' },
                  { emoji: '🎵', title: 'Your Voice', description: 'Is my favorite song in the world' },
                  { emoji: '🌈', title: 'Your Presence', description: 'Is my rainbow after the rain' },
                ].map((item, i) => (
                  <PremiumCard
                    key={i}
                    emoji={item.emoji}
                    title={item.title}
                    description={item.description}
                    delay={2 + i * 0.1}
                  />
                ))}
              </motion.div>

              {/* Love Letter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.6 }}
                className="w-full max-w-3xl"
              >
                <motion.div
                  className="relative bg-gradient-to-br from-white/95 via-pink-50/80 to-rose-50/60 backdrop-blur-xl border-2 border-rose-300/50 rounded-3xl p-10 shadow-2xl overflow-hidden"
                  whileHover={{ borderColor: 'rgba(220, 20, 60, 0.8)' }}
                >
                  {/* Decorative corners */}
                  <div className="absolute top-4 left-4 text-3xl opacity-30">❖</div>
                  <div className="absolute top-4 right-4 text-3xl opacity-30">❖</div>
                  <div className="absolute bottom-4 left-4 text-3xl opacity-30">❖</div>
                  <div className="absolute bottom-4 right-4 text-3xl opacity-30">❖</div>

                  <div className="relative z-10 text-center space-y-4">
                    <p className="text-xl font-serif italic text-rose-900 leading-relaxed">
                      My love, just like a rose, you brought color and fragrance into my world.
                      Every petal of our journey represents a beautiful memory we've shared.
                      Today, I give you this virtual rose as a symbol of my growing affection for you.
                    </p>
                    <p className="text-lg font-serif italic text-rose-600">
                      With all my heart and every rose,
                    </p>
                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-500">
                      Yours Forever 💕
                    </p>
                  </div>

                  {/* Animated border */}
                  <motion.div
                    animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute inset-0 rounded-3xl p-px bg-gradient-to-r from-rose-400 via-pink-400 to-red-400 opacity-0 group-hover:opacity-100 -z-10"
                    style={{ backgroundSize: '200% 200%' }}
                  />
                </motion.div>
              </motion.div>

              {/* Interactive Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3 }}
                className="flex gap-4 flex-wrap justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(220, 20, 60, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    triggerConfetti();
                    triggerConfetti();
                    triggerConfetti();
                  }}
                  className="px-10 py-4 bg-gradient-to-r from-rose-600 to-pink-500 text-white rounded-full font-bold shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
                >
                  <Sparkles size={20} />
                  Celebrate Love 🎉
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setRoseCount(0);
                    setShowBouquet(false);
                    setCurrentPhase('bloom');
                  }}
                  className="px-10 py-4 bg-white border-2 border-rose-600 text-rose-600 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all"
                >
                  🔄 Bloom Again
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Notes Section */}
      <AnimatePresence>
        {showNotesSection && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="relative z-10 w-full max-w-4xl mx-auto mb-12"
          >
            <NotesViewer dayId={1} dayName="Rose Day" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Note Form - Before Day Unlocks */}
      {currentPhase === 'intro' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-2xl mx-auto mb-12 px-4"
        >
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl border border-rose-100 p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">✨ Before We Begin</h3>
            <p className="text-sm text-gray-600 mb-4">What are your thoughts before experiencing Rose Day?</p>
            <NoteForm dayId={1} noteType="before" placeholder="Share your expectations, hopes, or excitement..." />
          </div>
        </motion.div>
      )}

      {/* Note Form - After Day Experience */}
      {currentPhase === 'bouquet' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-2xl mx-auto mb-12 px-4"
        >
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl border border-rose-100 p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">💭 After the Experience</h3>
            <p className="text-sm text-gray-600 mb-4">How did you feel? Share your thoughts and memories...</p>
            <NoteForm dayId={1} noteType="after" placeholder="Reflect on your experience, what moved you the most, favorite moments..." />
          </div>
        </motion.div>
      )}

      {/* View Notes Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowNotesSection(!showNotesSection)}
        className="fixed bottom-24 right-6 z-40 px-4 py-2 bg-rose-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow text-sm"
      >
        {showNotesSection ? '❌ Close Notes' : '📖 View Notes'}
      </motion.button>

      {/* Bottom decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-6 text-4xl pointer-events-none z-0"
      >
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
          🌹
        </motion.div>
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}>
          💕
        </motion.div>
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.4 }}>
          🌹
        </motion.div>
      </motion.div>
    </main>
  );
}

