'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

const NOTES = [
  "You are my favorite notification.",
  "I love you more than coffee (but please don't make me prove it).",
  "You're the CSS to my HTML.",
  "My heart is and always will be yours.",
  "You make my world sparkle.",
  "I'm much more 'me' when I'm with you.",
  "Every love story is beautiful, but ours is my favorite."
];

export const LoveNotes = () => {
  const [currentNote, setCurrentNote] = useState(0);

  return (
    <div className="mt-12 text-center max-w-md mx-auto px-6">
      <div className="inline-flex items-center gap-2 text-rose-400 mb-4">
        <Sparkles className="w-4 h-4" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Daily Sweetness</span>
      </div>
      
      <div className="relative h-24 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentNote}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-lg font-serif italic text-rose-800/80 leading-relaxed"
          >
            "{NOTES[currentNote]}"
          </motion.p>
        </AnimatePresence>
      </div>

      <button
        onClick={() => setCurrentNote((prev) => (prev + 1) % NOTES.length)}
        className="mt-4 p-2 rounded-full bg-white shadow-sm border border-rose-50 text-rose-400 hover:text-rose-600 hover:scale-110 transition-all"
      >
        <Heart className="w-5 h-5 fill-current" />
      </button>
    </div>
  );
};
