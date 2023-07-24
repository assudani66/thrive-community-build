import { useRouter } from 'next/navigation'
import React from 'react'

const ThriveLogo = () => {
  const router = useRouter()
  const logoAction = () => {
    router.push("/trending")
  }
  return (
    <img 
    className='px-4 py-3' src='thrive_logo.svg'
    onClick={()=>logoAction()}
    />
  )
}

export default ThriveLogo