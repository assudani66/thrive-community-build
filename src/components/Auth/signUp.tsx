"use client"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import TxtInput from './txtInput'
import toast from 'react-hot-toast'

const SignUp = () => {

    const router = useRouter()
    const [showPassword,setShowPassword] = useState(false)
    const [loginInfo,setLoginInfo] = useState({
        email:"",
        password:"",
        confirmPassword:''
    })
    
    const signUp = async() => {
        if(loginInfo.password !== loginInfo.confirmPassword){
            toast.error("password and confirm password doesnt match")
        }
        if(loginInfo.password === loginInfo.confirmPassword){
            const supabase = createClientComponentClient()
            try{

                const {data,error} = await supabase.auth.signUp({
                    email:loginInfo.email,
                    password:loginInfo.password,
                    options: {
                        emailRedirectTo: `${location.origin}/auth/callback`,
                      },
                })
                if(error) throw error
                router.refresh()
            }catch(error){
                toast.error("incorrect login credits")
                console.log(error)
            }
        }

    }
    
    const updateLoginState  = (e:React.ChangeEvent<HTMLInputElement>) => {

        setLoginInfo({...loginInfo,[e.target.name] :e.target.value})
    }

  return (
    <div className='flex-col space-y-4'>
        <input className='w-full h-12 rounded-xl px-5 border border-neutral-200' placeholder='email' name='email' onChange={e=>updateLoginState(e)} />
            <TxtInput loginInfo={loginInfo} id="password" updateLoginState={updateLoginState}/>
            <TxtInput loginInfo={loginInfo} id='confirmPassword' updateLoginState={updateLoginState}/>
        <button className='mainbutton w-full rounded-lg' onClick={()=>signUp()} >sign up</button>

    </div>
  )
}

export default SignUp