import EditProfile from '@/components/Profile/editProfile'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function Account() {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
  <>
    <div className='flex items-center justify-center '>
        <div className='flex-col max-w-xs'>
          <div className='flex-col max-w-xs col-start-2 space-y-4 justify-start items-start'>
            <EditProfile session={session} />
          </div>
        </div>
    </div>
  </>
  )
}