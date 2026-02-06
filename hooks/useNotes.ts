'use client';

import { useState, useCallback } from 'react';

interface Note {
  id: string;
  user_id: string;
  day_id: number;
  note_type: 'before' | 'after';
  content: string;
  created_at: string;
  updated_at: string;
}

// Module-level cache & in-flight deduper so components don't refetch on every mount.
const notesCache = new Map<number, Note[]>();
const inflight = new Map<number, Promise<Note[]>>();

export const useNotes = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveNote = useCallback(async (dayId: number, noteType: 'before' | 'after', content: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dayId, noteType, content }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save note');
      }

      const data = await response.json();
      return { success: true, data: data.data };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchNotes = useCallback(async (dayId: number): Promise<Note[] | null> => {
    if (notesCache.has(dayId)) {
      return notesCache.get(dayId) as Note[];
    }
    if (inflight.has(dayId)) {
      return inflight.get(dayId) as Promise<Note[]>;
    }

    // Only show loading if we don't already have cached data.
    setLoading(true);
    setError(null);
    const request = (async () => {
      try {
        const response = await fetch(`/api/notes?dayId=${dayId}`);

        if (!response.ok) {
          if (response.status === 403) {
            setError('Notes are private');
            return null;
          }
          const d = await response.json().catch(() => ({}));
          throw new Error(d.error || 'Failed to fetch notes');
        }

        const data = await response.json();
        const notes: Note[] = data.data || [];
        notesCache.set(dayId, notes);
        return notes;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        return null;
      } finally {
        inflight.delete(dayId);
        setLoading(false);
      }
    })();

    inflight.set(dayId, request);
    return request;
  }, []);

  return {
    saveNote,
    fetchNotes,
    loading,
    error,
  };
};
