"use client"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import React from 'react'
const Logout = () => {
  const router = useRouter()
  const signOut = async () => {
    try {
      const supabase = createClientComponentClient()
      const { error } = await supabase.auth.signOut()
      router.refresh()
      if (error) throw error
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <button className='bg-red-400 bg-opacity-10 rounded-2xl px-3 py-3 ' onClick={() => signOut()} >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M5 21C4.45 21 3.979 20.804 3.587 20.412C3.195 20.02 2.99934 19.5493 3 19V5C3 4.45 3.196 3.979 3.588 3.587C3.98 3.195 4.45067 2.99934 5 3H12V5H5V19H12V21H5ZM16 17L14.625 15.55L17.175 13H9V11H17.175L14.625 8.45L16 7L21 12L16 17Z" fill="#FE9063"/>
      </svg>
      </button>
    </div>
  )
}

export default Logout