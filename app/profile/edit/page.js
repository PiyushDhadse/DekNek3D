'use client'

import { useActionState, useEffect, useState } from 'react'
import { updateProfile } from '@/app/actions/profile'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function EditProfilePage() {
  const [state, formAction, pending] = useActionState(updateProfile, { error: null })
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        setProfile(data)
      }
      setLoading(false)
    }
    loadProfile()
  }, [])

  if (loading) {
    return (
      <main className="page-container-narrow">
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '4rem 0' }}>
          Loading profile...
        </p>
      </main>
    )
  }

  return (
    <main className="page-container" style={{ maxWidth: '600px' }}>
      <Link href="/dashboard" className="back-btn">
        ← Back to Dashboard
      </Link>
      
      <div className="editor-wrapper" style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Edit Your Profile
        </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Tell the world about your art and who you are.
      </p>

      {state?.error && <div className="form-error">{state.error}</div>}

      <form action={formAction}>
        <div className="form-group">
          <label htmlFor="display_name" className="form-label">Display Name</label>
          <input
            id="display_name"
            name="display_name"
            type="text"
            required
            className="form-input"
            defaultValue={profile?.display_name || ''}
            placeholder="Your artist name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="art_style" className="form-label">Art Style</label>
          <input
            id="art_style"
            name="art_style"
            type="text"
            className="form-input"
            defaultValue={profile?.art_style || ''}
            placeholder="e.g., Oil Painting, Digital Art, Photography"
          />
        </div>

        <div className="form-group">
          <label htmlFor="bio" className="form-label">Bio</label>
          <textarea
            id="bio"
            name="bio"
            className="form-input"
            defaultValue={profile?.bio || ''}
            placeholder="Tell us about yourself and your art journey..."
            rows={4}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
      </div>
    </main>
  )
}
