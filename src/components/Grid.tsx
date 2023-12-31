"use client"
import React, { useEffect, useState } from 'react'
import MobileNavBar from './NavBars/MobileNavBar'
import DesktopNavBar from './NavBars/DesktopNavBar'
import Tags from './tags/tags'
import SearchInput from './search_input'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import PostList from './postComponents/postList'
import Logout from './Auth/logout'
import Profile from './Profile/Profile'
import TrendingHeader from './TrendingHeader'
import { usePathname, useRouter } from 'next/navigation'
const ResponsiveGrid = ({ currentPage, userProfile }: { currentPage: 'PROFILE' | 'POSTS', userProfile?: string }) => {

  const pathName = usePathname()
  const router = useRouter()
  const [postList, setPostList] = useState<any[] | undefined>([])
  const [session, setSession] = useState<any | null>()
  const supabase = createClientComponentClient()

  const getCurrentUserSession = async () => {
    try {
      const session = await supabase.auth.getSession()
      setSession(session)
    } catch (error) {
      console.log(error)
    }
  }

  const getAllPosts = async () => {
    try {
      var { data, error } = await supabase.from("posts").select().order('created_at', { ascending: false })
      if (pathName === "/trending") {
        setPostList(data?.sort((a, b) => b?.likes?.length - a?.likes?.length))
      } else {
        setPostList(data ?? [])
      }
      if (error) throw error
    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => { getAllPosts(), getCurrentUserSession() }, [])

  return (
    <div className='flex items-center justify-center pb-24'>
      <div className='flex-col'>
        <div className='flex justify-between py-4 sticky'>
          <p className='text-center text-red-400 text-[28px] font-semibold'
            onClick={() => router.push("/")}
          >Home</p>
          <Logout />
        </div>
        <div className="
          grid grid-cols-1 max-w-full min-w-full md:gap-4
          md:grid-cols-3 md:max-w-5xl
          lg:grid-cols-3 lg:max-w-6xl">
          <div className='w-full pl-20 h-screen hidden md:block'>
            <DesktopNavBar />
          </div>
          <div className='flex-col w-80 col-start-2 space-y-4 justify-start items-start'>
            {currentPage === "POSTS" &&
              <div>
                <TrendingHeader />
                <PostList setListofPost={setPostList} listOfPost={postList ?? []} session={session} />
              </div>
            }
            {currentPage === 'PROFILE' && <Profile userId={userProfile ? userProfile : session?.data?.session?.user?.id} />}
          </div>
          <div className='p-4 w-full h-screen hidden md:block '>
            <SearchInput />
            <Tags session={session} supabase={supabase} />
          </div>
        </div>
        <div>
        </div>
      </div>
      <MobileNavBar />
    </div>
  )
}

export default ResponsiveGrid