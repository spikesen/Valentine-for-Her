'use client';

import { motion } from 'framer-motion';
import { MemoryGallery } from '@/components/MemoryGallery';
import { FloatingHearts } from '@/components/FloatingHearts';
import { ArrowLeft, Sparkles, Trophy } from 'lucide-react';
import Link from 'next/link';
import { useProgress } from '@/hooks/useProgress';

export default function GalleryPage() {
  const { progress } = useProgress();

  return (
    <main className="min-h-screen bg-[#FFF5F5] text-[#2C2C2C] pb-20 relative overflow-hidden">
      <FloatingHearts />
      
      <header className="sticky top-0 z-30 bg-white/60 backdrop-blur-md border-b border-rose-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-rose-600 font-medium hover:text-rose-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <h1 className="font-serif font-bold text-2xl text-rose-900">Memory Gallery</h1>
          <div className="flex items-center gap-2 bg-rose-100 px-3 py-1 rounded-full">
            <Trophy className="w-4 h-4 text-rose-600" />
            <span className="text-xs font-bold text-rose-600">{progress.hearts}</span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 pt-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-rose-600 mb-2">
            <Sparkles className="w-5 h-5" />
            <span className="font-bold uppercase tracking-widest text-xs">Treasured Moments</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-rose-900">Our Love Story</h2>
          <p className="text-rose-700/60 mt-2">Every day is a new chapter we write together.</p>
        </motion.div>

        <MemoryGallery />
      </div>
    </main>
  );
}
