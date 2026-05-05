import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import PostCard from '@/app/components/PostCard'

export default async function FeedPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('posts')
    .select('*, profiles(display_name, art_style, username)')
    .order('created_at', { ascending: false })
    .limit(20)

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="hero-label">Artistry Platform</div>
        <h1 className="hero-title">
          Where artists share their story.
        </h1>
        <p className="hero-subtitle">
          A minimalist space to blog about your creative process,
          share your journey, and inspire fellow creators.
        </p>
        <div className="hero-actions">
          <Link href="/signup" className="btn btn-primary" style={{ width: 'auto' }}>
            Get Started
          </Link>
          <Link href="#feed" className="btn btn-secondary">
            Explore Posts
          </Link>
        </div>
      </section>

      {/* Feed */}
      <section className="page-container" id="feed">
        <div className="section-header">
          <h2 className="section-title">Recent Posts</h2>
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
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </div>
            <p className="empty-state-text">
              No posts yet. Be the first artist to share your story!
            </p>
            <Link href="/signup" className="btn btn-primary" style={{ width: 'auto' }}>
              Get Started
            </Link>
          </div>
        )}
      </section>
    </main>
  )
}
