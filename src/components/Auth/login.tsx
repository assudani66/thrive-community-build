
import React, { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import TxtInput from './txtInput'
import toast from 'react-hot-toast'

const Login = () => {
    const router = useRouter()

    const [showPassword,setShowPassword] = useState(false)
    const [loginInfo,setLoginInfo] = useState({
        email:"",
        password:"",
    })

    const updateLoginState  = (e:React.ChangeEvent<HTMLInputElement>) => {
        setLoginInfo({...loginInfo,[e.target.name] :e.target.value})
    }
    
    const signIn = async () => {

        try {            
            const supabase = createClientComponentClient()
            const {data,error} =  await supabase.auth.signInWithPassword({
                    email:loginInfo.email,
                    password:loginInfo.password
            })
            if(error) throw error
            router.push('/')
        } catch (error) {
            toast.error("password or email is not matching")
            
        }
    }
    
  return (
    <div className='flex-col space-y-4'>
        <input className='w-full h-12 rounded-xl px-5 border border-neutral-200' placeholder='email' name='email' onChange={e=>updateLoginState(e)} value={loginInfo.email} />
           <div className="w-full flex justify-end items-center relative" >
            <TxtInput id="password" loginInfo={loginInfo} updateLoginState={updateLoginState}/>
            </div>
        <button className='bg-gray-300 py-2 w-full rounded-lg' onClick={()=>setLoginInfo({
            email:"thriverbuilder@yopmail.com",
            password:"Thriver@123"
        })} >Guest Credentials</button>
        <button className='mainbutton w-full rounded-lg' onClick={()=>signIn()} >Sign in</button>
        
    </div>
  )
}

export default Login