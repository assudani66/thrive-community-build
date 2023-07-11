
import React, { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
const Login = () => {
    const router = useRouter()

    const [loginInfo,setLoginInfo] = useState({
        email:"",
        password:""
    })

    const updateLoginState  = (e:React.ChangeEvent<HTMLInputElement>) => {
        setLoginInfo({...loginInfo,[e.target.name] :e.target.value})
    }
    
    const signIn = async() => {

        try {            
            const supabase = createClientComponentClient()
            const {data} =  await supabase.auth.signInWithPassword({
                    email:loginInfo.email,
                    password:loginInfo.password
            })
            console.log(data)
            router.push('/')
        } catch (error) {
            
        }
    }
    
  return (
    <div className='flex-col space-y-4'>
        <input className='w-full h-12 rounded-xl px-5 border border-neutral-200' placeholder='email' name='email' onChange={e=>updateLoginState(e)} value={loginInfo.email} />
        <input className='w-full h-12 rounded-xl px-5 border border-neutral-200' placeholder='password' name='password' onChange={e=>updateLoginState(e)} value={loginInfo.password} />
        <button className='bg-gray-300 py-2 w-full rounded-lg' onClick={()=>setLoginInfo({
            email:"assudani66@gmail.com",
            password:"Py1234567@"
        })} >Guest Credentials</button>
        <button className='mainbutton w-full rounded-lg' onClick={()=>signIn()} >Sign in</button>
        
    </div>
  )
}

export default Login