BEGIN;

-- Make user_id nullable so anonymous submissions are possible
ALTER TABLE public.day_notes
  ALTER COLUMN user_id DROP NOT NULL;

-- Note: keep foreign key so authenticated submissions still reference auth.users when provided.
-- This allows anonymous notes (user_id = NULL) while preserving linkage for logged-in users.

COMMIT;
