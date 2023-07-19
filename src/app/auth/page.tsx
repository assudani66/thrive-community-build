"use client"

import Login from '@/components/Auth/login'
import SignUp from '@/components/Auth/signUp'
import React, { useState } from 'react'

const AuthPage = () => {
    const [newUser,setNewUser] = useState(false)
    
  return (
    <>
     <div className='flex items-center justify-center'>
      <div className='flex-col'>
        <div className='flex-col max-w-xs col-start-2 space-y-4 justify-start items-start'>
          {!newUser && <Login/>}
          { newUser && <SignUp/>}
          <div>
              <p className='p-5'>
                  {newUser ? "new user  ?" : "already a user ?" }<span className='text-orange-500 cursor-pointer' onClick={()=>setNewUser(!newUser)}> { newUser ?" Sign in": " Sign up" } here</span>
              </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default AuthPage