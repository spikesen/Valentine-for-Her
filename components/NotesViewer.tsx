'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotes } from '@/hooks/useNotes';
import { MessageSquare, Loader } from 'lucide-react';

interface Note {
  id: string;
  user_id: string;
  day_id: number;
  note_type: 'before' | 'after';
  content: string;
  created_at: string;
  updated_at: string;
}

interface NotesViewerProps {
  dayId: number;
  dayName: string;
}

export const NotesViewer = ({ dayId, dayName }: NotesViewerProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const { fetchNotes, loading, error } = useNotes();
  const [selectedTab, setSelectedTab] = useState<'before' | 'after'>('before');

  useEffect(() => {
    if (dayId == null) return;

    const loadNotes = async () => {
      const data = await fetchNotes(dayId);
      if (data) {
        setNotes(data);
      }
    };
    loadNotes();
  }, [dayId, fetchNotes]);

  const filteredNotes = notes.filter((note) => note.note_type === selectedTab);
  const beforeNotes = notes.filter((note) => note.note_type === 'before');
  const afterNotes = notes.filter((note) => note.note_type === 'after');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white/60 backdrop-blur-lg rounded-2xl border border-rose-100 p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="w-6 h-6 text-rose-600" />
          <h3 className="text-xl font-bold text-gray-800">Notes for {dayName}</h3>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader className="w-6 h-6 animate-spin text-rose-600" />
          </div>
        ) : error ? (
          <p className="text-center text-red-600 py-8">{error}</p>
        ) : notes.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No notes yet. Add your thoughts before or after experiencing this day!
          </p>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-rose-100">
              <button
                onClick={() => setSelectedTab('before')}
                className={`pb-3 px-4 font-semibold relative transition-colors ${
                  selectedTab === 'before'
                    ? 'text-rose-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Before ({beforeNotes.length})
                {selectedTab === 'before' && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-rose-600"
                  />
                )}
              </button>
              <button
                onClick={() => setSelectedTab('after')}
                className={`pb-3 px-4 font-semibold relative transition-colors ${
                  selectedTab === 'after'
                    ? 'text-rose-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                After ({afterNotes.length})
                {selectedTab === 'after' && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-rose-600"
                  />
                )}
              </button>
            </div>

            {/* Notes List */}
            <AnimatePresence mode="wait">
              {filteredNotes.length === 0 ? (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-gray-500 py-8"
                >
                  No {selectedTab} notes yet
                </motion.p>
              ) : (
                <motion.div
                  key="notes"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {filteredNotes.map((note, idx) => (
                    <motion.div
                      key={note.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-4 border border-rose-100"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs font-semibold text-rose-600 bg-rose-100 px-2 py-1 rounded-full">
                          {selectedTab === 'before'
                            ? '✨ Before'
                            : '💭 After'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(note.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {note.content}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </motion.div>
  );
};
