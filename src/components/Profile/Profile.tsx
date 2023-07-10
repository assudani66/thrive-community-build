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
    website:""
})

  const getUserInfo = async() => {
    try {
        const {data,error} = await supabase.from('profiles').select(`full_name, username, website, avatar_url`).eq('id',user?.id).single()
        setUserInfo(
          {...userInfo,
          username:data?.username,
          full_name:data?.full_name,
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
      <div className='w-20 h-20 bg-red-600 rounded-xl wrap'></div>
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
  </div>
  )
}

export default Profile