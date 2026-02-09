'use client';

import { useState, useEffect, useMemo } from 'react';
import { intervalToDuration, isAfter } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

interface CountdownTimerProps {
  targetDate: Date;
  onUnlock?: () => void;
}

export const CountdownTimer = ({ targetDate, onUnlock }: CountdownTimerProps) => {
  const [duration, setDuration] = useState<Duration | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [prevDuration, setPrevDuration] = useState<Duration | null>(null);

  // Memoize the target date to ensure it doesn't cause unnecessary re-renders
  const memoizedTargetDate = useMemo(() => targetDate, [targetDate.getTime()]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      if (isAfter(now, memoizedTargetDate)) {
        setIsUnlocked(true);
        setDuration(null);
        onUnlock?.();
        clearInterval(timer);
      } else {
        const d = intervalToDuration({ start: now, end: memoizedTargetDate });
        setPrevDuration(duration);
        setDuration(d);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [memoizedTargetDate, onUnlock, duration]);

  if (isUnlocked) return null;

  const Digit = ({ value, prevValue }: { value: string; prevValue?: string }) => {
    const isChanged = value !== prevValue;
    
    return (
      <div className="relative w-4 h-8 md:w-8 md:h-14 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={value}
            initial={isChanged ? { y: 24, opacity: 0, rotateX: 90 } : { y: 0, opacity: 1, rotateX: 0 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={isChanged ? { y: -24, opacity: 0, rotateX: -90 } : { y: 0, opacity: 1, rotateX: 0 }}
            transition={{ duration: isChanged ? 0.5 : 0, ease: "easeInOut" }}
            className="absolute text-lg md:text-4xl font-bold text-rose-600 font-mono"
            style={{ perspective: 1000 }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
    );
  };

  const TimeUnit = ({ value, prevValue, label }: { value: number | undefined; prevValue: number | undefined; label: string }) => {
    const stringValue = String(value || 0).padStart(2, '0');
    const prevStringValue = String(prevValue || 0).padStart(2, '0');
    
    return (
      <div className="flex items-center gap-0.5 md:gap-1">
        <div className="flex bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl px-1 md:px-2 shadow-inner">
          <Digit value={stringValue[0]} prevValue={prevStringValue[0]} />
          <Digit value={stringValue[1]} prevValue={prevStringValue[1]} />
        </div>
        <span className="text-[6px] md:text-[8px] uppercase tracking-[0.15em] text-rose-800/60 font-bold whitespace-nowrap">
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center gap-0.5 md:gap-1.5 py-3 md:py-4 overflow-x-auto">
      <TimeUnit value={duration?.days} prevValue={prevDuration?.days} label="D" />
      <div className="text-rose-300 font-bold text-sm md:text-lg flex-shrink-0">:</div>
      <TimeUnit value={duration?.hours} prevValue={prevDuration?.hours} label="H" />
      <div className="text-rose-300 font-bold text-sm md:text-lg flex-shrink-0">:</div>
      <TimeUnit value={duration?.minutes} prevValue={prevDuration?.minutes} label="M" />
      <div className="text-rose-300 font-bold text-sm md:text-lg flex-shrink-0">:</div>
      <TimeUnit value={duration?.seconds} prevValue={prevDuration?.seconds} label="S" />
    </div>
  );
};
