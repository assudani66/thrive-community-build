import React from 'react'
import ThriveLogo from '../thrivelogo'
import { useRouter } from 'next/navigation'

const DesktopNavBar = () => {
  const router = useRouter()
  return (
    <div className='bg-white h-screen w-full py-5 flex-col
    justify-items-end
    space-y-4
    '>
        <div onClick={()=>console.log("load trending posts")}>
          <ThriveLogo />
        </div>
        <div className='px-5 flex-col
    justify-items-end
    space-y-4'>
    <div className='flex space-x-2 justify-self-end cursur-pointer' onClick={()=>router.push("/")} >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.7982 9.06611C23.8857 8.93501 23.9465 8.78795 23.9771 8.63335C24.0077 8.47875 24.0076 8.31962 23.9768 8.16506C23.9459 8.01051 23.8849 7.86354 23.7972 7.73257C23.7095 7.60159 23.5969 7.48917 23.4658 7.40173L12.666 0.201778C12.4688 0.0702122 12.237 0 12 0C11.7629 0 11.5312 0.0702122 11.334 0.201778L0.534146 7.40173C0.269358 7.57836 0.0855815 7.85294 0.0232454 8.16508C-0.0390908 8.47721 0.0251195 8.80132 0.201751 9.06611C0.378383 9.3309 0.652967 9.51468 0.965097 9.57702C1.27723 9.63935 1.60134 9.57514 1.86613 9.39851L2.40012 9.04211V22.8C2.40012 23.1183 2.52654 23.4235 2.75158 23.6485C2.97663 23.8736 3.28185 24 3.6001 24H20.3998C20.7181 24 21.0233 23.8736 21.2484 23.6485C21.4734 23.4235 21.5998 23.1183 21.5998 22.8V9.04211L22.1338 9.40211C22.2649 9.48959 22.412 9.55038 22.5666 9.58102C22.7212 9.61166 22.8803 9.61154 23.0349 9.58068C23.1894 9.54981 23.3364 9.4888 23.4674 9.40113C23.5983 9.31345 23.7108 9.20084 23.7982 9.06971V9.06611ZM19.1999 21.6H4.80008V7.44012L12 2.64016L19.1999 7.44012V21.6Z" fill="#FE9063"/>
      </svg>
      <p>Home</p>
    </div>
    <div className='flex space-x-2 cursor-pointer' onClick={()=>router.push("/message")}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 11.4445C22.0038 12.911 21.6612 14.3577 21 15.6667C20.216 17.2353 19.0108 18.5546 17.5194 19.477C16.0279 20.3993 14.3091 20.8882 12.5555 20.8889C11.089 20.8927 9.64234 20.5501 8.33332 19.8889L2 22L4.11111 15.6667C3.44992 14.3577 3.10729 12.911 3.11111 11.4445C3.11179 9.69086 3.60068 7.97208 4.52302 6.48064C5.44536 4.98919 6.76472 3.78399 8.33332 3.00003C9.64234 2.33884 11.089 1.99621 12.5555 2.00003H13.1111C15.427 2.1278 17.6145 3.10532 19.2546 4.74543C20.8947 6.38553 21.8722 8.57297 22 10.8889V11.4445Z" stroke="#FE9063" stroke-opacity="0.4" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <p>Message</p>
      </div>
      <div className='flex space-x-2 cursor-pointer' onClick={()=>router.push("/profile")}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#FE9063" stroke-opacity="0.4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#FE9063" stroke-opacity="0.4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <p>Profile</p>
      </div>
      </div>
    </div>
  )
}

export default DesktopNavBar