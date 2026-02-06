'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VALENTINE_DAYS } from '@/data/valentineDays';
import { NotesViewer } from '@/components/NotesViewer';
import Link from 'next/link';
import { ArrowLeft, Heart } from 'lucide-react';

export default function NotesPage() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  useEffect(() => {
    // Check if valentine was accepted
    const accepted = localStorage.getItem('valentineAccepted');
    if (!accepted) {
      window.location.href = '/valentine';
    }
  }, []);

  const selectedDayData = VALENTINE_DAYS.find((d) => d.id === selectedDay);

  return (
    <main className="min-h-screen w-full bg-[#FFF5F5] text-[#2C2C2C] relative flex flex-col items-center py-8 px-4 md:px-6 gap-6 md:gap-8 overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-500 mb-2">
          Our Love Notes
        </h1>
        <p className="text-gray-600 text-lg">Every thought, every reflection, every moment cherished</p>
      </motion.div>

      {/* Back Button */}
      <Link href="/">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-md rounded-full border border-rose-200 text-rose-600 font-semibold hover:shadow-lg transition-shadow"
        >
          <ArrowLeft className="w-4 h-4" />
          Back Home
        </motion.button>
      </Link>

      {selectedDay ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl"
        >
          {/* Back to Days List */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedDay(null)}
            className="mb-6 flex items-center gap-2 px-4 py-2 text-rose-600 font-semibold hover:bg-rose-50 rounded-lg transition-colors"
          >
            ← Back to Days
          </motion.button>

          {/* Notes Viewer */}
          <NotesViewer dayId={selectedDay} dayName={selectedDayData?.name || 'Day'} />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-5xl"
        >
          {/* Days Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {VALENTINE_DAYS.map((day, idx) => (
              <motion.button
                key={day.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDay(day.id)}
                className="group relative bg-gradient-to-br from-white/80 to-rose-50/60 backdrop-blur-lg rounded-2xl border border-rose-100 p-6 shadow-lg hover:shadow-xl hover:border-rose-300 transition-all overflow-hidden"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-rose-400/0 via-pink-400/0 to-rose-400/0 group-hover:from-rose-400/10 group-hover:via-pink-400/10 group-hover:to-rose-400/10 transition-all" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{day.emoji}</span>
                    <span className="text-xs font-bold text-rose-600 bg-rose-100 px-2 py-1 rounded-full">
                      Day {day.id}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 text-left">{day.name}</h3>
                  <p className="text-xs text-gray-500 mb-4 text-left">{day.date}</p>
                  <div className="flex items-center gap-2 text-rose-600 font-semibold text-sm">
                    <Heart className="w-4 h-4" />
                    View Notes →
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Floating decoration */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="fixed bottom-8 right-8 text-5xl pointer-events-none"
      >
        💕
      </motion.div>
    </main>
  );
}
