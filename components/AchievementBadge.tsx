'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Heart, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const BADGES: Badge[] = [
  { id: 'first_step', title: 'First Step', description: 'Completed Day 1', icon: <Star />, color: 'bg-yellow-400' },
  { id: 'halfway', title: 'Halfway There', description: 'Completed 7 Days', icon: <Zap />, color: 'bg-blue-400' },
  { id: 'perfect', title: 'Perfect Valentine', description: 'Completed all 14 days', icon: <Trophy />, color: 'bg-rose-600' },
  { id: 'heart_collector', title: 'Heart Collector', description: 'Earned 100 hearts', icon: <Heart />, color: 'bg-pink-400' },
];

export const AchievementBadge = ({ completedCount, hearts }: { completedCount: number, hearts: number }) => {
  const [unlockedBadges, setUnlockedBadges] = useState<Badge[]>([]);

  useEffect(() => {
    const newBadges: Badge[] = [];
    if (completedCount >= 1) newBadges.push(BADGES[0]);
    if (completedCount >= 7) newBadges.push(BADGES[1]);
    if (completedCount >= 14) newBadges.push(BADGES[2]);
    if (hearts >= 100) newBadges.push(BADGES[3]);
    setUnlockedBadges(newBadges);
  }, [completedCount, hearts]);

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-8">
      {BADGES.map((badge) => {
        const isUnlocked = unlockedBadges.some(b => b.id === badge.id);
        return (
          <motion.div
            key={badge.id}
            initial={false}
            animate={{ 
              opacity: isUnlocked ? 1 : 0.3,
              scale: isUnlocked ? 1 : 0.9,
              filter: isUnlocked ? 'grayscale(0%)' : 'grayscale(100%)'
            }}
            className="relative group"
          >
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-500",
              isUnlocked ? badge.color : "bg-gray-200"
            )}>
              {badge.icon}
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 p-2 bg-rose-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 text-center">
              <p className="font-bold">{badge.title}</p>
              <p className="opacity-70">{badge.description}</p>
              {!isUnlocked && <p className="mt-1 text-rose-300 font-bold">Locked</p>}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

import { cn } from '@/lib/utils';
