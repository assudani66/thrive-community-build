"use client"
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useEffect, useState } from 'react'

const Profile = ({ session }: { session: Session | null }) => {
  const user = session?.user
  const supabase = createClientComponentClient()

  const [userInfo,setUserInfo] = useState({
    name:"",
    username:"",
    full_name:"",
    avatar_url:"",
    website:""
})

  const getUserInfo = async() => {
    try {
        const {data,error} = await supabase.from('profiles').select(`full_name, username, website, avatar_url`).eq('id',user?.id).single()
        console.log(data)
        setUserInfo(
          {...userInfo,
          username:data?.username,
          full_name:data?.full_name,
          avatar_url:data?.avatar_url,
          website:data?.website
          })
        if(error) throw error
    } catch (error) {
        // alert("error")
        console.error(error)
    }
}

useEffect(()=>{getUserInfo()},[])

  return (
    <div className='p-0'>
    <div className='w-full  bg-indigo-500 h-40'></div>
    <div className='px-5 relative bottom-10'>
      <img className='w-20 h-20 rounded-xl wrap' src={userInfo.avatar_url}></img>
    <div className='flex justify-between'>
    <div className='flex-col'>
    <p className='font-medium'>{userInfo.full_name} • {}</p>
    <p>@{userInfo.username}</p>
    </div>
    <svg onClick={()=>console.log("this works")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
    </div>
    <p className='max-w-20'>
      fsdfsdfsfsdfsfsdfsdfsdfsfsfsdfs
      ;dfsfsdfsdfsdflkljlk;jl;jpoijiojlkjlkjoisdf
    </p>
    </div>
    <div className='hidden md:block pt-4'>
          </div>
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
  </div>
  )
}

export default Profile