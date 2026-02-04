'use client';

import { useState, useEffect } from 'react';
import { intervalToDuration, isAfter } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

interface CountdownTimerProps {
  targetDate: Date;
  onUnlock?: () => void;
}

export const CountdownTimer = ({ targetDate, onUnlock }: CountdownTimerProps) => {
  const [duration, setDuration] = useState<Duration | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      if (isAfter(now, targetDate)) {
        setIsUnlocked(true);
        setDuration(null);
        onUnlock?.();
        clearInterval(timer);
      } else {
        const d = intervalToDuration({ start: now, end: targetDate });
        setDuration(d);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onUnlock]);

  if (isUnlocked) return null;

  const Digit = ({ value }: { value: string }) => (
    <div className="relative w-7 h-12 md:w-10 md:h-16 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: "backOut" }}
          className="absolute text-3xl md:text-5xl font-bold text-rose-600 font-mono"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );

  const TimeUnit = ({ value, label }: { value: number | undefined; label: string }) => {
    const stringValue = String(value || 0).padStart(2, '0');
    return (
      <div className="flex flex-col items-center mx-1 md:mx-3">
        <div className="flex bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl px-2 shadow-inner">
          <Digit value={stringValue[0]} />
          <Digit value={stringValue[1]} />
        </div>
        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] mt-2 text-rose-800/60 font-bold">
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center py-6">
      <TimeUnit value={duration?.days} label="Days" />
      <div className="text-rose-300 font-bold text-2xl mb-6">:</div>
      <TimeUnit value={duration?.hours} label="Hours" />
      <div className="text-rose-300 font-bold text-2xl mb-6">:</div>
      <TimeUnit value={duration?.minutes} label="Mins" />
      <div className="text-rose-300 font-bold text-2xl mb-6">:</div>
      <TimeUnit value={duration?.seconds} label="Secs" />
    </div>
  );
};
