import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: post } = await supabase
    .from('posts')
    .select('title')
    .eq('id', id)
    .single()

  return {
    title: post ? `${post.title} — Artistry` : 'Post Not Found',
  }
}

export default async function PostPage({ params }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: post, error } = await supabase
    .from('posts')
    .select('*, profiles(id, display_name, art_style, username)')
    .eq('id', id)
    .single()

  if (error || !post) notFound()

  const author = post.profiles
  const date = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <main className="post-detail">
      <Link href="/" className="back-btn">
        ← Back to Feed
      </Link>
      <h1 className="post-detail-title">{post.title}</h1>

      <Link href={`/profile/${author?.id}`} className="post-detail-author">
        <div className="post-detail-avatar">
          {(author?.display_name || 'A').charAt(0).toUpperCase()}
        </div>
        <div className="post-detail-author-info">
          <div className="post-detail-author-name">
            {author?.display_name || 'Unknown Artist'}
          </div>
          {author?.art_style && (
            <div className="post-detail-author-style">{author.art_style}</div>
          )}
        </div>
        <span className="post-detail-date">{date}</span>
      </Link>

      <div className="post-detail-content">{post.content}</div>

      {post.tags && post.tags.length > 0 && (
        <div className="post-detail-tags">
          {post.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </main>
  )
}
