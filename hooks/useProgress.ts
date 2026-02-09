'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { VALENTINE_DAYS } from '@/data/valentineDays';
import { parseFinlandDate } from '@/lib/utils';

export interface DayMemory {
  dayId: number;
  photoUrl?: string;
  response?: string;
  completedAt: string;
}

export interface UserProgress {
  completedDays: number[];
  hearts: number;
  memories: Record<number, DayMemory>;
}

const STORAGE_KEY = 'valentine_journey_progress';

export const useProgress = () => {
  const [progress, setProgress] = useState<UserProgress>({
    completedDays: [],
    hearts: 0,
    memories: {},
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const initializeOnceRef = useRef(false);

  // Initialize on client side only, once per component instance
  useEffect(() => {
    // Prevent running twice in strict mode
    if (initializeOnceRef.current) return;
    initializeOnceRef.current = true;

    console.log('useProgress: Initializing...');

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      let currentProgress: UserProgress = {
        completedDays: [],
        hearts: 0,
        memories: {},
      };

      if (saved) {
        currentProgress = JSON.parse(saved);
        console.log('useProgress: Loaded from localStorage:', currentProgress);
      }

      // Auto-complete past days
      const now = new Date();
      let needsUpdate = false;
      const completedBefore = currentProgress.completedDays.length;

      for (const day of VALENTINE_DAYS) {
        const dayDate = parseFinlandDate(day.date);
        const nextDayStart = new Date(dayDate);
        nextDayStart.setDate(nextDayStart.getDate() + 1);

        // If this day is fully in the past and not completed, mark it as completed
        if (now >= nextDayStart && !currentProgress.completedDays.includes(day.id)) {
          currentProgress.completedDays.push(day.id);
          currentProgress.hearts += 10;
          currentProgress.memories[day.id] = {
            dayId: day.id,
            response: `${day.name} passed`,
            completedAt: dayDate.toISOString(),
          };
          needsUpdate = true;
          console.log(`useProgress: Auto-completed day ${day.id}: ${day.name}`);
        }
      }

      if (needsUpdate) {
        console.log(`useProgress: Auto-completed ${currentProgress.completedDays.length - completedBefore} days`);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentProgress));
      }

      console.log('useProgress: Final progress:', currentProgress);
      setProgress(currentProgress);
    } catch (e) {
      console.error('useProgress: Failed to initialize:', e);
    }

    setIsLoaded(true);
  }, []);

  // Listen for storage changes from other tabs/windows  
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          console.log('useProgress: Storage changed, updating:', parsed);
          setProgress(parsed);
        } catch (error) {
          console.error('useProgress: Failed to parse storage event:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const completeDay = useCallback((dayId: number, memory?: Partial<DayMemory>) => {
    setProgress((currentProgress) => {
      if (currentProgress.completedDays.includes(dayId)) {
        console.log(`useProgress: Day ${dayId} already completed`);
        return currentProgress;
      }

      const newProgress: UserProgress = {
        ...currentProgress,
        completedDays: [...currentProgress.completedDays, dayId],
        hearts: currentProgress.hearts + 10,
        memories: {
          ...currentProgress.memories,
          [dayId]: {
            dayId,
            completedAt: new Date().toISOString(),
            ...memory,
          },
        },
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      console.log('useProgress: Day completed:', dayId, newProgress);

      return newProgress;
    });
  }, []);

  const updateMemory = useCallback((dayId: number, updates: Partial<DayMemory>) => {
    setProgress((currentProgress) => {
      const newProgress: UserProgress = {
        ...currentProgress,
        memories: {
          ...currentProgress.memories,
          [dayId]: {
            ...(currentProgress.memories[dayId] || { dayId, completedAt: new Date().toISOString() }),
            ...updates,
          },
        },
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      return newProgress;
    });
  }, []);

  return {
    progress,
    completeDay,
    updateMemory,
    isDayCompleted: (dayId: number) => progress.completedDays.includes(dayId),
    isLoaded,
  };
};
