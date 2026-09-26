import { redirect } from 'next/navigation'

import DashboardView from '@/components/dashboard-view'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) {
    redirect('/auth/login')
  }

  return <DashboardView />
}