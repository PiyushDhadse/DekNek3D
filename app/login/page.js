'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { login } from '@/app/actions/auth'

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, { error: null })

  return (
    <main className="auth-split-wrapper">
      <div className="auth-image-side">
        <div className="auth-image-overlay" />
      </div>
      
      <div className="auth-form-side">
        <div className="auth-card-minimal">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to continue creating</p>

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
                className="form-input"
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={pending}>
              {pending ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className="auth-footer">
            Don&apos;t have an account? <Link href="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </main>
  )
}
