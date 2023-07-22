"use client"
import EditPost from '@/components/postComponents/update-posts'
import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useEffect, useState } from 'react'
import { cookies } from 'next/headers'

const EditPage = ({params}:{params:{id:string}}) => {
  const [session,setSession] = useState<any | null>()
  const supabase = createClientComponentClient()

  const getCurrentUserSession = async()=>{
    try {
      const session  = await supabase.auth.getSession()
      setSession(session)      
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{getCurrentUserSession()},[])

  return (

    <div>
        <EditPost session={session}  postId={params.id}/>
    </div>
  )
}

export default EditPage