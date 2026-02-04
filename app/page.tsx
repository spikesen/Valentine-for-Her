'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, CheckCircle2, Sparkles, X, Menu, ImageIcon, SettingsIcon } from 'lucide-react';
import { VALENTINE_DAYS, ValentineDay } from '@/data/valentineDays';
import { CountdownTimer } from '@/components/CountdownTimer';
import { FloatingHearts } from '@/components/FloatingHearts';
import { UnlockButton } from '@/components/UnlockButton';
import { isAfter } from 'date-fns';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CursorTrail } from '@/components/CursorTrail';
import { MiniAlbum } from '@/components/MiniAlbum';
import { LoveNotes } from '@/components/LoveNotes';
import { AchievementBadge } from '@/components/AchievementBadge';
import { useProgress } from '@/hooks/useProgress';

export default function Home() {
  const router = useRouter();
  const { progress } = useProgress();
  const [nextDay, setNextDay] = useState<ValentineDay | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const now = new Date();
    const found = VALENTINE_DAYS.find(day => {
      const dayDate = new Date(day.date);
      return !progress.completedDays.includes(day.id) || !isAfter(now, dayDate);
    }) || VALENTINE_DAYS[VALENTINE_DAYS.length - 1];

    setNextDay(found);
    
    const dayDate = new Date(found.date);
    setIsUnlocked(isAfter(now, dayDate));
  }, [progress.completedDays]);

  if (!nextDay) return null;

  return (
    <main className="h-screen w-full bg-[#FFF5F5] text-[#2C2C2C] relative overflow-hidden flex flex-col items-center justify-between py-4 px-4 md:py-8 md:px-6">
      <CursorTrail />
      <FloatingHearts />

      {/* Navigation Menu */}
      <div className="fixed top-4 right-4 z-50">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg text-rose-600 hover:text-rose-700 transition-colors"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              className="absolute top-12 right-0 w-40 bg-white rounded-xl shadow-2xl border border-rose-50 overflow-hidden"
            >
              <Link 
                href="/gallery" 
                className="flex items-center gap-2 px-4 py-3 hover:bg-rose-50 text-rose-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <ImageIcon className="w-4 h-4" />
                <span className="text-xs font-medium">Gallery</span>
              </Link>
              <button 
                className="w-full flex items-center gap-2 px-4 py-3 hover:bg-rose-50 text-rose-900 transition-colors border-t border-rose-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <SettingsIcon className="w-4 h-4" />
                <span className="text-xs font-medium">Settings</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="z-10 text-center shrink-0"
      >
        <div className="relative inline-block mb-2">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              filter: ["drop-shadow(0 0 0px rgba(220, 20, 60, 0))", "drop-shadow(0 0 10px rgba(220, 20, 60, 0.2))", "drop-shadow(0 0 0px rgba(220, 20, 60, 0))"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="w-8 h-8 md:w-10 md:h-10 text-rose-600 fill-rose-600" />
          </motion.div>
        </div>
        
        <h1 className="text-2xl md:text-4xl font-serif font-bold text-rose-900 mb-1 tracking-tight">
          Our Valentine's <span className="text-rose-600">Journey</span>
        </h1>
        <div className="flex flex-col items-center">
          <p className="text-rose-700/60 font-bold tracking-[0.2em] uppercase text-[8px] md:text-[10px]">
            For My Love of life <span className="text-rose-600">Paro</span> ❤️ 2026
          </p>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            className="h-[1px] bg-gradient-to-r from-transparent via-rose-300 to-transparent mt-1"
          />
        </div>
      </motion.div>

      {/* Mini Album Section */}
      <div className="z-10 w-full max-w-xl shrink-0">
        <MiniAlbum />
      </div>

      {/* Main Content Card */}
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="z-10 w-full max-w-lg bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[2rem] p-6 md:p-8 shadow-[0_15px_30px_-10px_rgba(220,20,60,0.1)] text-center relative overflow-hidden flex-1 flex flex-col justify-center max-h-[40vh]"
      >
        <div className="relative z-10">
          <div className="mb-4">
            <h2 className="text-rose-800 font-bold mb-2 flex items-center justify-center gap-2 text-[8px] md:text-[10px] uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-gold" />
              {isUnlocked ? "Today's Surprise is Ready" : "Next Surprise Unlocks In"}
              <Sparkles className="w-3 h-3 text-gold" />
            </h2>
            
            {!isUnlocked ? (
              <CountdownTimer 
                targetDate={new Date(nextDay.date)} 
                onUnlock={() => setIsUnlocked(true)} 
              />
            ) : (
              <div className="py-2">
                <UnlockButton 
                  label={`Unlock ${nextDay.name}`} 
                  onClick={() => router.push(`/days/${nextDay.slug}`)} 
                />
              </div>
            )}
          </div>

          {/* Mystery Preview */}
          <div className="relative group border-t border-rose-100/50 pt-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-rose-400 border border-rose-50 shrink-0">
                {isUnlocked ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Lock className="w-5 h-5" />}
              </div>
              <div className="text-left">
                <p className="text-[7px] font-black text-rose-400 uppercase tracking-[0.2em]">Coming Next</p>
                <p className="text-lg font-serif font-bold text-rose-900 leading-tight">{nextDay.name}</p>
              </div>
            </div>
            <p className="text-rose-700/70 italic text-xs font-serif line-clamp-1">
              "{nextDay.hint}"
            </p>
          </div>
        </div>
      </motion.div>

      {/* Love Notes Section */}
      <div className="z-10 shrink-0">
        <LoveNotes />
      </div>

      {/* Progress Tracker & Badges */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="z-10 flex flex-col items-center shrink-0"
      >
        <div className="flex gap-6 mb-2">
          <div className="text-center">
            <p className="text-lg font-bold text-rose-900">{progress.completedDays.length}/14</p>
            <p className="text-[7px] uppercase tracking-widest text-rose-500 font-bold">Days</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-rose-900">{progress.hearts}</p>
            <p className="text-[7px] uppercase tracking-widest text-rose-500 font-bold">Hearts</p>
          </div>
        </div>

        <AchievementBadge 
          completedCount={progress.completedDays.length} 
          hearts={progress.hearts} 
        />
      </motion.div>

      {/* Background Decoration */}
      <div className="fixed bottom-0 left-0 w-full h-16 bg-gradient-to-t from-rose-100/20 to-transparent pointer-events-none" />
    </main>
  );
}
