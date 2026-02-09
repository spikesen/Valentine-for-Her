'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { VALENTINE_DAYS } from '@/data/valentineDays';
import { parseFinlandDate } from '@/lib/utils';
import { useProgress } from './useProgress';

/**
 * Enhanced day gate that checks:
 * 1. If day exists
 * 2. If day is available (date has passed)
 * 3. Redirects properly if not available
 */
export const useDayGateEnhanced = (dayId: number) => {
  const router = useRouter();
  const { progress, isLoaded } = useProgress();

  useEffect(() => {
    if (!isLoaded) return;

    const day = VALENTINE_DAYS.find((d) => d.id === dayId);
    if (!day) {
      router.push('/');
      return;
    }

    const now = new Date();
    const dayDate = parseFinlandDate(day.date);
    const nextDayStart = new Date(dayDate);
    nextDayStart.setDate(nextDayStart.getDate() + 1);

    // If the day hasn't arrived yet, redirect
    if (now < dayDate) {
      console.warn(`Day ${dayId} not yet available. Available on ${day.date}`);
      router.push('/');
      return;
    }

    console.log(`Day ${dayId} (${day.name}) is available`);
  }, [dayId, router, progress, isLoaded]);
};

/**
 * Get day availability status
 */
export const getDayStatus = (
  dayId: number,
  completedDays: number[]
): 'locked' | 'available' | 'completed' => {
  const day = VALENTINE_DAYS.find((d) => d.id === dayId);
  if (!day) return 'locked';

  const now = new Date();
  const dayDate = parseFinlandDate(day.date);
  const nextDayStart = new Date(dayDate);
  nextDayStart.setDate(nextDayStart.getDate() + 1);

  if (now < dayDate) {
    return 'locked';
  }

  if (completedDays.includes(dayId)) {
    return 'completed';
  }

  return 'available';
};

/**
 * Get days in progress order for timeline
 */
export const getDaysInOrder = (completedDays: number[]) => {
  const now = new Date();

  return VALENTINE_DAYS.map((day) => {
    const dayDate = parseFinlandDate(day.date);
    const nextDayStart = new Date(dayDate);
    nextDayStart.setDate(nextDayStart.getDate() + 1);

    const isAvailable = now >= dayDate;
    const isCompleted = completedDays.includes(day.id);

    return {
      ...day,
      status: isCompleted ? 'completed' : isAvailable ? 'available' : 'locked',
      isAvailable,
      isCompleted,
    };
  });
};
