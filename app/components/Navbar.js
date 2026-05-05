'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { signout } from '@/app/actions/auth'

export default function Navbar() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-brand">
          <span className="brand-text">Artistry</span>
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${menuOpen ? 'open' : ''}`} />
        </button>

        <div className={`navbar-links ${menuOpen ? 'show' : ''}`}>
          <Link href="/" className="nav-link" onClick={() => setMenuOpen(false)}>
            Explore
          </Link>

          {!loading && user ? (
            <>
              <Link href="/dashboard" className="nav-link" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <Link href="/posts/new" className="nav-link nav-link-accent" onClick={() => setMenuOpen(false)}>
                + New Post
              </Link>
              <form action={signout}>
                <button type="submit" className="nav-link nav-btn-logout">
                  Logout
                </button>
              </form>
            </>
          ) : !loading ? (
            <>
              <Link href="/login" className="nav-link" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link href="/signup" className="nav-link nav-link-primary" onClick={() => setMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  )
}
