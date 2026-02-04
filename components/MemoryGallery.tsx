'use client';

import { motion } from 'framer-motion';
import { useProgress } from '@/hooks/useProgress';
import { VALENTINE_DAYS } from '@/data/valentineDays';
import { Heart, Calendar, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export const MemoryGallery = () => {
  const { progress } = useProgress();
  
  const completedDays = VALENTINE_DAYS.filter(day => 
    progress.completedDays.includes(day.id)
  );

  if (completedDays.length === 0) {
    return (
      <div className="text-center py-12 bg-white/40 backdrop-blur-md rounded-[2rem] border border-white/60">
        <ImageIcon className="w-12 h-12 text-rose-200 mx-auto mb-4" />
        <p className="text-rose-800 font-medium">Your gallery is empty.</p>
        <p className="text-rose-500 text-sm">Complete days to unlock memories!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {completedDays.map((day, index) => (
        <motion.div
          key={day.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
        >
          <Link href={`/days/${day.slug}`}>
            <div className="aspect-[4/3] bg-rose-50 relative overflow-hidden">
              {progress.memories[day.id]?.photoUrl ? (
                <img 
                  src={progress.memories[day.id].photoUrl} 
                  alt={day.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-rose-200">
                  <span className="text-6xl mb-2">{day.emoji}</span>
                  <span className="text-xs font-bold uppercase tracking-widest">Day {day.id}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif font-bold text-xl text-rose-900">{day.name}</h3>
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              </div>
              <p className="text-rose-700/70 text-sm line-clamp-2 italic mb-4">
                {progress.memories[day.id]?.response || "No note left for this day..."}
              </p>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-tighter text-rose-400">
                <Calendar className="w-3 h-3" />
                <span>{new Date(day.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};
