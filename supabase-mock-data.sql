-- MOCK DATA SCRIPT FOR ARTISTRY (FIXED)
-- Run this in your Supabase SQL Editor

-- 1. Insert Mock Users into auth.users
-- This ensures the foreign key constraint in the profiles table is satisfied.
-- The trigger we set up will automatically create the profile rows for us.

INSERT INTO auth.users (id, email, raw_user_meta_data, aud, role)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'vincent@example.com', '{"display_name": "Vincent van Gogh"}', 'authenticated', 'authenticated'),
  ('00000000-0000-0000-0000-000000000002', 'leonardo@example.com', '{"display_name": "Leonardo da Vinci"}', 'authenticated', 'authenticated'),
  ('00000000-0000-0000-0000-000000000003', 'frida@example.com', '{"display_name": "Frida Kahlo"}', 'authenticated', 'authenticated'),
  ('00000000-0000-0000-0000-000000000004', 'pablo@example.com', '{"display_name": "Pablo Picasso"}', 'authenticated', 'authenticated')
ON CONFLICT (id) DO NOTHING;

-- 2. Update the automatically created Profiles with artist details
UPDATE public.profiles SET 
  username = 'vincent', 
  display_name = 'Vincent van Gogh', 
  art_style = 'Post-Impressionism', 
  bio = 'I dream my painting and I paint my dream.'
WHERE id = '00000000-0000-0000-0000-000000000001';

UPDATE public.profiles SET 
  username = 'leonardo', 
  display_name = 'Leonardo da Vinci', 
  art_style = 'Renaissance Art', 
  bio = 'Simplicity is the ultimate sophistication.'
WHERE id = '00000000-0000-0000-0000-000000000002';

UPDATE public.profiles SET 
  username = 'frida', 
  display_name = 'Frida Kahlo', 
  art_style = 'Surrealism', 
  bio = 'I paint self-portraits because I am so often alone.'
WHERE id = '00000000-0000-0000-0000-000000000003';

UPDATE public.profiles SET 
  username = 'pablo', 
  display_name = 'Pablo Picasso', 
  art_style = 'Cubism', 
  bio = 'Everything you can imagine is real.'
WHERE id = '00000000-0000-0000-0000-000000000004';

-- 3. Insert Mock Posts
-- We use a DELETE first to ensure we don't duplicate on multiple runs
DELETE FROM public.posts WHERE author_id IN (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000004'
);

INSERT INTO public.posts (author_id, title, content, tags)
VALUES 
  (
    '00000000-0000-0000-0000-000000000001', 
    'The Starry Night: A Journey Through the Night Sky', 
    'The night is even more richly colored than the day. I wanted to capture the movement of the stars and the quiet energy of the village below. This piece was painted during a time of great reflection.', 
    ARRAY['painting', 'stars', 'expressionism']
  ),
  (
    '00000000-0000-0000-0000-000000000002', 
    'The Geometry of the Human Face', 
    'Art is the queen of all sciences communicating knowledge to all the generations of the world. In my studies of anatomy, I find that every curve and shadow has a mathematical purpose.', 
    ARRAY['anatomy', 'sketch', 'renaissance']
  ),
  (
    '00000000-0000-0000-0000-000000000003', 
    'Flowers for the Soul', 
    'I paint flowers so they will not die. They are the only things that stay beautiful in this world of pain. My garden in Coyoacán is my greatest inspiration.', 
    ARRAY['flowers', 'mexico', 'nature']
  ),
  (
    '00000000-0000-0000-0000-000000000004', 
    'Beyond the Perspective', 
    'I do not paint what I see, I paint what I think. Cubism is about seeing things from multiple angles at once, breaking reality into its true components.', 
    ARRAY['cubism', 'modern', 'abstract']
  );
