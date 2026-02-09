'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { VALENTINE_DAYS } from '@/data/valentineDays';
import { ArrowLeft, Heart, CheckCircle2 } from 'lucide-react';
import { NoteForm } from '@/components/NoteForm';
import { useProgress } from '@/hooks/useProgress';
import { useDayGate } from '@/hooks/useDayGate';
import { useState } from 'react';
import { DayPageLayout } from '@/components/DayPageLayout';

export default function DayPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  const day = VALENTINE_DAYS.find((d) => d.slug === slug);
  const { completeDay, isDayCompleted } = useProgress();
  const [isCompleted, setIsCompleted] = useState(false);

  // Apply access control - redirect if user tries to access a future day
  if (day) {
    useDayGate(day.id);
  }

  const handleMarkComplete = () => {
    if (day && !isDayCompleted(day.id)) {
      completeDay(day.id, { response: `${day.name} experienced` });
      setIsCompleted(true);
    }
  };

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
    <DayPageLayout day={day}>
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-xl space-y-6">
          <div className="bg-white/70 border border-rose-100 rounded-3xl shadow-lg p-6 md:p-8 space-y-4 text-center">
            <p className="text-[11px] uppercase tracking-[0.3em] text-rose-400 font-bold">
              Today&apos;s Little Chapter
            </p>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-rose-900">{day.name}</h1>
            <p className="text-sm md:text-base text-rose-700/80 italic">"{day.hint}"</p>
            <p className="text-xs text-rose-500 mt-4">
              More interactive magic for this day will appear here soon. For now, just know that this whole journey
              was crafted with you in mind.
            </p>
            
            {!isCompleted && !isDayCompleted(day.id) && (
              <button
                onClick={handleMarkComplete}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-full font-semibold text-sm hover:bg-rose-700 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                Mark as Experienced
              </button>
            )}
            {(isCompleted || isDayCompleted(day.id)) && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                Day Completed!
              </div>
            )}
          </div>

          <div className="bg-white/70 border border-rose-100 rounded-2xl shadow-lg p-6 md:p-8 space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-rose-600 fill-rose-500" />
              <h2 className="text-lg font-serif font-bold text-rose-900">Share Your Experience</h2>
            </div>
            <NoteForm
              dayId={day.id}
              noteType="after"
              placeholder={`How did ${day.name} make you feel?`}
            />
          </div>
        </div>
      </div>
    </DayPageLayout>
  );
}
