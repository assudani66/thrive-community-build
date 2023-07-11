"use client"
import Logout from '@/components/Auth/logout'
import ResponsiveGrid from '@/components/Grid'
import Image from 'next/image'

export default function Home() {
  return (<div>
    <Logout/>
    <ResponsiveGrid/>
  </div>
  )
}
