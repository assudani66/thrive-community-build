import ResponsiveGrid from '@/components/Grid'
import Profile from '@/components/Profile/Profile'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function Account() {

  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return <ResponsiveGrid currentPage='PROFILE' />
}