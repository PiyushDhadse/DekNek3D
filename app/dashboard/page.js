import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import PostCard from '@/app/components/PostCard'
import { deletePost } from '@/app/actions/posts'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: posts } = await supabase
    .from('posts')
    .select('*, profiles(display_name, art_style, username)')
    .eq('author_id', user.id)
    .order('created_at', { ascending: false })

  const postCount = posts?.length || 0

  return (
    <main className="page-container">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-welcome">
            Welcome, {profile?.display_name || 'Artist'}
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            {profile?.art_style || 'Complete your profile to tell us about your art style'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link href="/profile/edit" className="btn btn-secondary btn-sm">
            Edit Profile
          </Link>
          <Link href="/posts/new" className="btn btn-primary btn-sm" style={{ width: 'auto' }}>
            + New Post
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-value">{postCount}</div>
          <div className="stat-label">Posts Published</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{profile?.art_style ? '✓' : '—'}</div>
          <div className="stat-label">Art Style Set</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{profile?.bio ? '✓' : '—'}</div>
          <div className="stat-label">Bio Written</div>
        </div>
      </div>

      {/* Your Posts */}
      <div className="section-header">
        <h2 className="section-title">Your Posts</h2>
      </div>

      {posts && posts.length > 0 ? (
        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post.id} style={{ position: 'relative' }}>
              <PostCard post={post} />
              <form
                action={async () => {
                  'use server'
                  await deletePost(post.id)
                }}
                style={{
                  position: 'absolute',
                  top: '0.75rem',
                  right: '0.75rem',
                  zIndex: 2,
                }}
              >
                <button type="submit" className="btn btn-danger btn-sm">
                  Delete
                </button>
              </form>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
          </div>
          <p className="empty-state-text">
            You haven&apos;t written any posts yet. Share your art story!
          </p>
          <Link href="/posts/new" className="btn btn-primary" style={{ width: 'auto' }}>
            Write Your First Post
          </Link>
        </div>
      )}
    </main>
  )
}
