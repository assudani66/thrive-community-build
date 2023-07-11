"use client"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import React from 'react'
const Logout = () => {
    const router = useRouter()
    const signOut = async() => {
      try {        
        const supabase = createClientComponentClient()
        const {error} =  await supabase.auth.signOut()
        router.refresh()
        if(error) throw error
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div>
        <button className='bg-gray-200 px-4 py-2 rounded-lg' onClick={()=>signOut()} >Sign out</button>
    </div>
  )
}

export default Logout