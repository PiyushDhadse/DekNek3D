'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function createPost(prevState, formData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to create a post.' }
  }

  const title = formData.get('title')?.trim()
  const content = formData.get('content')?.trim()
  const tagsStr = formData.get('tags') || ''
  const tags = tagsStr
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)

  if (!title || !content) {
    return { error: 'Title and content are required.' }
  }

  const { error } = await supabase.from('posts').insert({
    author_id: user.id,
    title,
    content,
    tags,
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/dashboard')
}

export async function deletePost(postId) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId)
    .eq('author_id', user.id)

  if (error) {
    return { error: error.message }
  }

  redirect('/dashboard')
}
