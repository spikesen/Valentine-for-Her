'use client';

import { useState, useEffect } from 'react';

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

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse progress', e);
      }
    }
  }, []);

  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
  };

  const completeDay = (dayId: number, memory?: Partial<DayMemory>) => {
    if (progress.completedDays.includes(dayId)) return;

    const newProgress: UserProgress = {
      ...progress,
      completedDays: [...progress.completedDays, dayId],
      hearts: progress.hearts + 10,
      memories: {
        ...progress.memories,
        [dayId]: {
          dayId,
          completedAt: new Date().toISOString(),
          ...memory,
        },
      },
    };
    saveProgress(newProgress);
  };

  const updateMemory = (dayId: number, updates: Partial<DayMemory>) => {
    const newProgress: UserProgress = {
      ...progress,
      memories: {
        ...progress.memories,
        [dayId]: {
          ...(progress.memories[dayId] || { dayId, completedAt: new Date().toISOString() }),
          ...updates,
        },
      },
    };
    saveProgress(newProgress);
  };

  return {
    progress,
    completeDay,
    updateMemory,
    isDayCompleted: (dayId: number) => progress.completedDays.includes(dayId),
  };
};
