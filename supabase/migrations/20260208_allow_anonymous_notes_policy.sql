BEGIN;

-- Allow anonymous (anon role) visitors to add notes without a Supabase session.
-- Inserts are only permitted when user_id is NULL to prevent spoofing another user.
CREATE POLICY "Anon can insert anonymous notes"
ON public.day_notes
FOR INSERT
WITH CHECK (
  auth.role() = 'anon' AND user_id IS NULL
);

COMMIT;
