BEGIN;

-- Create the storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('valentine-memories', 'valentine-memories', true)
ON CONFLICT (id) DO NOTHING;

-- Set up access policies for the bucket
-- Allow public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'valentine-memories' );

-- Allow authenticated users to upload their own memories
CREATE POLICY "Authenticated users can upload memories"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'valentine-memories' 
    AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to update/delete their own memories
CREATE POLICY "Users can update their own memories"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'valentine-memories' 
    AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete their own memories"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'valentine-memories' 
    AND (storage.foldername(name))[1] = auth.uid()::text
);

COMMIT;