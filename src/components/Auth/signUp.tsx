"use client"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SignUp = () => {
    const router = useRouter()
    const [loginInfo,setLoginInfo] = useState({
        email:"",
        password:""
    })
    
    const signUp = () => {

        console.log(location.origin)

        const supabase = createClientComponentClient()
        supabase.auth.signUp({
            email:loginInfo.email,
            password:loginInfo.password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
              },
        })
        router.refresh()
    }
    
    const updateLoginState  = (e:React.ChangeEvent<HTMLInputElement>) => {

        setLoginInfo({...loginInfo,[e.target.name] :e.target.value})
    }


  return (
    <div className='flex-col space-y-4'>
        <input className='w-full h-12 rounded-xl px-5 border border-neutral-200' placeholder='email' name='email' onChange={e=>updateLoginState(e)} />
        <input className='w-full h-12 rounded-xl px-5 border border-neutral-200' placeholder='password' name='password' onChange={e=>updateLoginState(e)}  />
        <button className='mainbutton w-full rounded-lg' onClick={()=>signUp()} >sign up</button>

    </div>
  )
}

export default SignUp