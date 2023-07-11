"use client"

import Login from '@/components/Auth/login'
import SignUp from '@/components/Auth/signUp'
import React, { useState } from 'react'

const AuthPage = () => {
    const [newUser,setNewUser] = useState(false)
    
  return (
    <>
    {!newUser && <Login/>}
    { newUser && <SignUp/>}
    <div>
        <p className='p-5'>
            {newUser ? "new user  ?" : "already a user ?" }<span className='text-orange-500 cursor-pointer' onClick={()=>setNewUser(!newUser)}> { newUser ?" Sign in": " Sign up" } here</span>
        </p>
    </div>
    </>
  )
}

export default AuthPage