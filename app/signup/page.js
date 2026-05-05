'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { signup } from '@/app/actions/auth'

export default function SignupPage() {
  const [state, formAction, pending] = useActionState(signup, { error: null })

  return (
    <main className="auth-split-wrapper">
      <div className="auth-image-side">
        <div className="auth-image-overlay" />
      </div>
      
      <div className="auth-form-side">
        <div className="auth-card-minimal">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join the community of artists</p>

          {state?.error && <div className="form-error">{state.error}</div>}

          <form action={formAction}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="form-input"
                placeholder="artist@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                className="form-input"
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={pending}>
              {pending ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link href="/login">Log in</Link>
          </p>
        </div>
      </div>
    </main>
  )
}
