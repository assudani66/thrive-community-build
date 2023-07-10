"use client"
import React, { useEffect, useState } from 'react'
import { Post } from './postComponents/post'
import MobileNavBar from './NavBars/MobileNavBar'
import CreatePost from './postComponents/create-posts'
import DesktopNavBar from './NavBars/DesktopNavBar'
import Tags from './tags/tags'
import SearchInput from './search_input'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import PostList from './postComponents/postList'

const ResponsiveGrid = () => {

  const [postList,setPostList] = useState<any[] | null>([])
  const supabase = createClientComponentClient()
  
  const getAllPosts = async() => {
    try{
      const {data,error} = await supabase.from("posts").select()
      setPostList(data)
    }
    catch(error){
      console.error(error)
    }
  }
  console.log(postList)
  useEffect(()=>{getAllPosts()},[])
  return (
    <div className='flex items-center justify-center'>
      <div className='flex-col'>
      {/* <div className='hidden md:block'>Desktop top bar sticky</div> */}
      <div className="
      grid grid-cols-1 max-w-full min-w-full md:gap-4
      md:grid-cols-3 md:max-w-5xl
      lg:grid-cols-3 lg:max-w-6xl">
        <div className='w-full pl-20 h-screen hidden md:block'>
          <DesktopNavBar/>
        </div>

        <div className='flex-col w-80 col-start-2 space-y-4 justify-start items-start'>
          <div>
            header
          </div>
          
          {/* <div className='hidden md:block pt-4'>
            <CreatePost/>
            </div>
          <PostList/> */}
          <div className='bg-indigo-500 h-fit flex justify-between rounded-lg text-white items-center'>
            <div className='flex items-center h-full px-7 py-2 bg-indigo-700 rounded-lg border-b-4 border-indigo-400 font-semibold '>
            <div className='flex-col justify-center text-center'>
            <p>52</p>
            <p className='m-0 p-0'>Posts</p>
            </div>
            </div>
            <div className='flex items-center h-full px-7'>
            <div className='flex-col justify-center text-center'>
            <p>52</p>
            <p className='m-0 p-0'>Following</p>
            </div>
            </div>
            <div className='flex items-center h-full px-7'>
            <div className='flex-col justify-center text-center'>
            <p>52</p>
            <p className='m-0 p-0'>Follower</p>
            </div>
            </div>
            
          </div>

          <PostList listOfPost={postList}/>

        </div>
        <div className='p-4 w-full h-screen hidden md:block '>
          <SearchInput/>
          <Tags/>
        </div>
      </div>
      <div>
      </div>
      </div>

      {/* mobile nav bar */}

      <MobileNavBar/>
    </div>
  )
}

export default ResponsiveGrid