"use client"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'
const Logout = () => {
    
    const signOut = () => {
      const supabase = createClientComponentClient()
        supabase.auth.signOut()
    }

  return (
    <div>
        <button className='bg-gray-200 px-4 py-2 rounded-lg' onClick={()=>signOut()} >Sign out</button>
    </div>
  )
}

export default Logout