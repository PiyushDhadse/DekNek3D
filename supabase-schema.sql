-- ============================================
-- Artistry - Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Profiles table (linked to auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  display_name text,
  bio text default '',
  art_style text default '',
  avatar_url text default '',
  created_at timestamptz default now()
);

-- Posts table (art blog posts)
create table public.posts (
  id uuid default gen_random_uuid() primary key,
  author_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  content text not null,
  tags text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.posts enable row level security;

-- Profiles policies
create policy "Anyone can view profiles"
  on public.profiles for select using (true);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- Posts policies
create policy "Anyone can view posts"
  on public.posts for select using (true);

create policy "Authenticated users can create posts"
  on public.posts for insert with check (auth.uid() = author_id);

create policy "Authors can update own posts"
  on public.posts for update using (auth.uid() = author_id);

create policy "Authors can delete own posts"
  on public.posts for delete using (auth.uid() = author_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Index for faster post queries
create index idx_posts_author on public.posts(author_id);
create index idx_posts_created on public.posts(created_at desc);
