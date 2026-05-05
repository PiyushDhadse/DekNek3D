import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import PostCard from '@/app/components/PostCard'

export async function generateMetadata({ params }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name')
    .eq('id', id)
    .single()

  return {
    title: profile
      ? `${profile.display_name} — Artistry`
      : 'Artist Not Found',
  }
}

export default async function ProfilePage({ params }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !profile) notFound()

  const { data: posts } = await supabase
    .from('posts')
    .select('*, profiles(display_name, art_style, username)')
    .eq('author_id', id)
    .order('created_at', { ascending: false })

  const joined = new Date(profile.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  })

  // Check if viewing own profile
  const { data: { user } } = await supabase.auth.getUser()
  const isOwner = user?.id === id

  return (
    <main className="page-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {(profile.display_name || 'A').charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{profile.display_name || 'Artist'}</h1>
          {profile.art_style && (
            <div className="profile-style">{profile.art_style}</div>
          )}
          {profile.bio && <p className="profile-bio">{profile.bio}</p>}
          <div className="profile-joined">Member since {joined}</div>
        </div>
        {isOwner && (
          <Link href="/profile/edit" className="btn btn-secondary btn-sm">
            Edit Profile
          </Link>
        )}
      </div>

      <div className="section-header">
        <h2 className="section-title">
          Posts ({posts?.length || 0})
        </h2>
      </div>

      {posts && posts.length > 0 ? (
        <div className="posts-grid">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <p className="empty-state-text">No posts yet.</p>
        </div>
      )}
    </main>
  )
}
