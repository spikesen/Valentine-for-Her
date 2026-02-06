'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader } from 'lucide-react';
import { useNotes } from '@/hooks/useNotes';

interface NoteFormProps {
  dayId: number;
  noteType: 'before' | 'after';
  initialContent?: string;
  placeholder?: string;
  onSuccess?: () => void;
}

export const NoteForm = ({
  dayId,
  noteType,
  initialContent = '',
  placeholder = 'Write your note...',
  onSuccess,
}: NoteFormProps) => {
  const [content, setContent] = useState(initialContent);
  const { saveNote, loading, error } = useNotes();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const result = await saveNote(dayId, noteType, content);
    if (result.success) {
      setShowSuccess(true);
      setContent('');
      setTimeout(() => setShowSuccess(false), 3000);
      onSuccess?.();
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="w-full"
    >
      <div className="flex flex-col gap-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          maxLength={500}
          rows={3}
          className="w-full p-3 rounded-lg border border-rose-200 bg-white/80 backdrop-blur-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none"
          disabled={loading}
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {content.length}/500
          </span>
          <motion.button
            type="submit"
            disabled={loading || !content.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Save Note
              </>
            )}
          </motion.button>
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-red-600"
          >
            {error}
          </motion.p>
        )}
        {showSuccess && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xs text-green-600 font-semibold"
          >
            ✓ Note saved!
          </motion.p>
        )}
      </div>
    </motion.form>
  );
};
