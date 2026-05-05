import Link from 'next/link'

export default function PostCard({ post }) {
  const author = post.profiles
  const excerpt =
    post.content.length > 180
      ? post.content.substring(0, 180) + '...'
      : post.content

  const timeAgo = getTimeAgo(new Date(post.created_at))

  return (
    <Link href={`/posts/${post.id}`} className="post-card">
      <div className="post-card-header">
        <div className="post-card-avatar">
          {(author?.display_name || 'A').charAt(0).toUpperCase()}
        </div>
        <div className="post-card-meta">
          <span className="post-card-author">{author?.display_name || 'Unknown Artist'}</span>
          {author?.art_style && (
            <span className="post-card-style">{author.art_style}</span>
          )}
        </div>
        <span className="post-card-time">{timeAgo}</span>
      </div>

      <h3 className="post-card-title">{post.title}</h3>
      <p className="post-card-excerpt">{excerpt}</p>

      {post.tags && post.tags.length > 0 && (
        <div className="post-card-tags">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}

function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return date.toLocaleDateString()
}
