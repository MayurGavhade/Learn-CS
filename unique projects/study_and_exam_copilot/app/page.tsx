import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export default async function RootPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getClaims()

  redirect(error || !data?.claims ? '/auth/login' : '/dashboard')
}