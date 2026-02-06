BEGIN;

-- Create notes table
CREATE TABLE IF NOT EXISTS public.day_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  day_id integer NOT NULL,
  note_type text NOT NULL CHECK (note_type IN ('before', 'after')),
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, day_id, note_type)
);

-- Enable RLS
ALTER TABLE public.day_notes ENABLE ROW LEVEL SECURITY;

-- Users can insert their own notes
CREATE POLICY "Users can insert own notes"
ON public.day_notes FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can read all notes (for their partner to see)
CREATE POLICY "Anyone can read notes"
ON public.day_notes FOR SELECT
USING (true);

-- Users can update their own notes
CREATE POLICY "Users can update own notes"
ON public.day_notes FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own notes
CREATE POLICY "Users can delete own notes"
ON public.day_notes FOR DELETE
USING (auth.uid() = user_id);

-- Create index for queries
CREATE INDEX idx_day_notes_day_id ON public.day_notes(day_id);
CREATE INDEX idx_day_notes_user_id ON public.day_notes(user_id);
CREATE INDEX idx_day_notes_type ON public.day_notes(note_type);

COMMIT;
