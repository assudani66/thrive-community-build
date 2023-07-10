
import React, { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
const Login = () => {

    const [loginInfo,setLoginInfo] = useState({
        email:"",
        password:""
    })

    
    const updateLoginState  = (e:React.ChangeEvent<HTMLInputElement>) => {
        
        setLoginInfo({...loginInfo,[e.target.name] :e.target.value})
    }
    
    const signIn = () => {
        const supabase = createClientComponentClient()
        supabase.auth.signInWithPassword({
            email:loginInfo.email,
            password:loginInfo.password
        })
    }
    
  return (
    <div className='flex-col space-y-4'>
        <input className='w-full h-12 rounded-xl px-5 border border-neutral-200' placeholder='email' name='email' onChange={e=>updateLoginState(e)} />
        <input className='w-full h-12 rounded-xl px-5 border border-neutral-200' placeholder='password' name='password' onChange={e=>updateLoginState(e)}  />
        <button className='mainbutton w-full rounded-lg' onClick={()=>signIn()} >Sign in</button>
    </div>
  )
}

export default Login