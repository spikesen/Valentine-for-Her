'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { VALENTINE_DAYS } from '@/data/valentineDays';
import { ArrowLeft, Heart } from 'lucide-react';

export default function DayPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  const day = VALENTINE_DAYS.find((d) => d.slug === slug);

  if (!day) {
    return (
      <main className="min-h-screen bg-[#FFF5F5] text-[#2C2C2C] flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-sm text-rose-500 uppercase tracking-[0.2em] font-bold">Not Found</p>
          <p className="text-rose-900 font-serif text-2xl">That special day doesn&apos;t exist yet.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 text-sm font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to our journey
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF5F5] text-[#2C2C2C] flex flex-col">
      <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-md border-b border-rose-100 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600 fill-rose-500" />
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.2em] text-rose-400 font-bold">Day {day.id}</p>
              <p className="text-sm font-semibold text-rose-900">{day.name}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-xl bg-white/70 border border-rose-100 rounded-3xl shadow-lg p-6 md:p-8 space-y-4 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-rose-400 font-bold">
            Today&apos;s Little Chapter
          </p>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-rose-900">{day.name}</h1>
          <p className="text-sm md:text-base text-rose-700/80 italic">"{day.hint}"</p>
          <p className="text-xs text-rose-500 mt-4">
            More interactive magic for this day will appear here soon. For now, just know that this whole journey
            was crafted with you in mind.
          </p>
        </div>
      </div>
    </main>
  );
}
