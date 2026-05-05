'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function updateProfile(prevState, formData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const display_name = formData.get('display_name')?.trim()
  const bio = formData.get('bio')?.trim()
  const art_style = formData.get('art_style')?.trim()

  if (!display_name) {
    return { error: 'Display name is required.' }
  }

  const { error } = await supabase
    .from('profiles')
    .update({ display_name, bio, art_style })
    .eq('id', user.id)

  if (error) {
    return { error: error.message }
  }

  redirect('/profile/' + user.id)
}
